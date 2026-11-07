"""
Tests de parcours (Playwright Python) — à lancer sur un serveur démarré :
    npm run build && npm start   (port 3000)
    python3 tests/e2e.py [http://localhost:3000] [dossier_captures]

Vérifie : pages en 200, absence de défilement horizontal (320 → 1440 px),
liens WhatsApp / tel, parcours de réservation (erreurs puis message prérempli),
devis flotte, préremplissage depuis un forfait.
"""
import sys, urllib.parse, os
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
SHOTS = sys.argv[2] if len(sys.argv) > 2 else None
CHROME = os.environ.get("CHROME_PATH", "/usr/bin/google-chrome")
PAGES = ["/", "/lavage", "/entretien", "/services-complementaires", "/abonnements", "/reservation", "/contact"]
WA = "https://wa.me/221776288342"
fails = []

def check(cond, msg):
    print(("  OK  " if cond else "  ÉCHEC ") + msg)
    if not cond:
        fails.append(msg)

def capture_open(page):
    page.evaluate("() => { window.__opened = []; window.open = (u) => { window.__opened.push(u); return null; }; }")

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME, args=["--no-sandbox"])

    print("1. Pages et débordement horizontal")
    for w in (320, 375, 768, 1440):
        ctx = browser.new_context(viewport={"width": w, "height": 860}, device_scale_factor=1)
        page = ctx.new_page()
        for path in PAGES:
            r = page.goto(BASE + path, wait_until="networkidle")
            ok = r.status == 200
            overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            check(ok and overflow <= 0, f"{w}px {path} (status {r.status}, débordement {overflow}px)")
            if SHOTS and w in (375, 1440):
                name = (path.strip("/") or "accueil").replace("/", "_")
                page.screenshot(path=f"{SHOTS}/{name}-{w}.png", full_page=True)
        ctx.close()

    ctx = browser.new_context(viewport={"width": 390, "height": 844}, has_touch=True, is_mobile=True)
    page = ctx.new_page()

    print("2. Liens WhatsApp et téléphone")
    page.goto(BASE + "/", wait_until="networkidle")
    links = page.eval_on_selector_all("a[href^='https://wa.me']", "els => els.map(e => e.href)")
    check(len(links) > 0 and all(l.startswith(WA + "?text=") for l in links), f"{len(links)} liens WhatsApp vers 221776288342")
    q = urllib.parse.parse_qs(urllib.parse.urlparse(links[0]).query)["text"][0]
    check(q == "Bonjour DAMEL CAR CARE, je souhaite obtenir des renseignements sur vos services.", "message par défaut du bouton flottant")
    tels = page.eval_on_selector_all("a[href^='tel:']", "els => els.map(e => e.getAttribute('href'))")
    check(len(tels) > 0 and all(t == "tel:+221776288342" for t in tels), "liens tel:+221776288342")
    bar = page.locator("div.fixed.bottom-0").first
    check(bar.is_visible(), "barre mobile Appeler / Réserver / WhatsApp visible")

    print("3. Réservation : validation")
    page.goto(BASE + "/reservation", wait_until="networkidle")
    capture_open(page)
    page.get_by_role("button", name="Confirmer ma demande sur WhatsApp").click()
    alerts = page.locator("[role=alert]").count()
    check(alerts >= 6, f"erreurs affichées sur formulaire vide ({alerts})")
    check(page.evaluate("window.__opened.length") == 0, "WhatsApp non ouvert si formulaire invalide")

    print("4. Réservation : parcours complet")
    page.get_by_label("Service souhaité *").select_option("lavage")
    page.locator("label:has-text('SEMI COMPLET')").first.click()
    page.locator("label:has-text('SUV / 4x4')").click()
    page.get_by_label("Marque et modèle (facultatif)").fill("Toyota RAV4")
    page.get_by_role("button", name="Demain").click()
    page.get_by_label("Heure souhaitée *").select_option("10:30")
    page.get_by_label("Nom et prénom *").fill("Awa Ndiaye")
    page.get_by_label("Téléphone *").fill("77 123 45 67")
    page.get_by_label("Commentaires ou demandes particulières (facultatif)").fill("Tapis très sales & siège bébé")
    page.locator("input[type=checkbox]").check()
    page.get_by_role("button", name="Confirmer ma demande sur WhatsApp").click()
    opened = page.evaluate("window.__opened")
    check(len(opened) == 1 and opened[0].startswith(WA + "?text="), "WhatsApp ouvert avec l'URL attendue")
    msg = urllib.parse.parse_qs(urllib.parse.urlparse(opened[0]).query)["text"][0] if opened else ""
    for frag in ["Je souhaite demander une réservation.", "Nom : Awa Ndiaye", "Téléphone : 77 123 45 67",
                 "Station : STAR ÉNERGIE Hann", "Véhicule : SUV / 4x4 — Toyota RAV4", "Prestation : Lavage automobile",
                 "Forfait : SEMI COMPLET — à partir de 7 000 FCFA", "Heure souhaitée : 10h30",
                 "Commentaires : Tapis très sales & siège bébé", "Merci de me confirmer la disponibilité."]:
        check(frag in msg, f"message contient « {frag} »")
    check(page.get_by_text("Votre rendez-vous sera confirmé par notre équipe sur WhatsApp.").first.is_visible(), "mention de confirmation par l'équipe")
    if SHOTS:
        page.screenshot(path=f"{SHOTS}/reservation-confirmation-390.png", full_page=False)
        print("\n--- Message généré ---\n" + msg + "\n----------------------")

    print("5. Préremplissage depuis un forfait")
    page.goto(BASE + "/reservation?service=lavage&forfait=complet", wait_until="networkidle")
    check(page.get_by_label("Service souhaité *").input_value() == "lavage", "service présélectionné")
    check(page.locator("input[name=forfait][value=complet]").is_checked(), "forfait Complet présélectionné")

    print("6. Devis flotte")
    page.goto(BASE + "/abonnements", wait_until="networkidle")
    capture_open(page)
    page.get_by_label("Entreprise *").fill("Transports Diop")
    page.get_by_label("Nom du contact *").fill("Moussa Diop")
    page.locator("form").filter(has_text="Demande de devis flotte").get_by_label("Téléphone *").fill("78 000 00 00")
    page.get_by_label("Nombre de véhicules *").fill("12")
    page.get_by_role("button", name="Envoyer ma demande sur WhatsApp").click()
    opened = page.evaluate("window.__opened")
    fm = urllib.parse.parse_qs(urllib.parse.urlparse(opened[0]).query)["text"][0] if opened else ""
    check("Nombre de véhicules : 12" in fm and "Entreprise : Transports Diop" in fm, "message de devis flotte")
    pack_links = page.eval_on_selector_all("a:has-text('Demander un abonnement')", "els => els.map(e => e.href)")
    check(len(pack_links) == 3 and all(l.startswith(WA) for l in pack_links), "3 boutons « Demander un abonnement »")

    print("7. SEO")
    page.goto(BASE + "/", wait_until="networkidle")
    check(page.locator("h1").count() == 1, "un seul H1 sur l'accueil")
    ld = page.eval_on_selector_all("script[type='application/ld+json']", "els => els.map(e => e.textContent)")
    check(any("AutoWash" in x for x in ld), "JSON-LD AutoWash présent")
    titles = set()
    for path in PAGES:
        page.goto(BASE + path, wait_until="domcontentloaded")
        titles.add(page.title())
    check(len(titles) == len(PAGES), "balises title uniques")
    browser.close()

print(f"\n{'TOUS LES TESTS RÉUSSIS' if not fails else str(len(fails)) + ' ÉCHEC(S)'}")
sys.exit(1 if fails else 0)
