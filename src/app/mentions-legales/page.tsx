import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Mentions légales & CGV',
  description:
    "Mentions légales et conditions générales de vente de FLOKKA, atelier de personnalisation textile à Andlau (Bas-Rhin).",
  path: '/mentions-legales',
})

export default function MentionsLegalesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-gray-text block mb-4">
            Informations légales
          </span>
          <h1 className="text-4xl font-black text-brand-black mb-12">Mentions légales & CGV</h1>

          <div className="space-y-10 text-brand-gray-text leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-brand-black mb-3">Éditeur du site</h2>
              <p>FLOKKA — Atelier de personnalisation textile.</p>
              <p>Andlau (67), Alsace, France.</p>
              <p>Email : contact@flokka.fr — Téléphone : 06 00 00 00 00.</p>
              <p className="mt-2 italic">SIRET et statut juridique : à compléter.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-black mb-3">Hébergement</h2>
              <p>
                Le site est hébergé par son prestataire technique. Coordonnées disponibles sur
                demande.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-black mb-3">
                Produits et personnalisation
              </h2>
              <p>
                Tous les articles sont personnalisés et produits à la demande. Chaque commande est
                fabriquée spécialement pour le client.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-black mb-3">Prix et paiement</h2>
              <p>
                Les prix sont indiqués en euros TTC. Le paiement en ligne sécurisé sera disponible
                prochainement. Une marge optionnelle peut être ajoutée par la structure partenaire.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-black mb-3">Droit de rétractation</h2>
              <p>
                Conformément à la réglementation, les produits personnalisés à la demande ne sont
                pas soumis au droit de rétractation, sauf défaut de fabrication.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-black mb-3">Données personnelles</h2>
              <p>
                Les données collectées via les formulaires servent uniquement à traiter vos demandes
                et commandes. Vous disposez d&apos;un droit d&apos;accès, de rectification et de
                suppression.
              </p>
            </div>

            <p className="text-xs text-brand-gray-medium border-t border-brand-gray-dark pt-6">
              Document type fourni à titre indicatif — à compléter avec vos informations
              officielles.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
