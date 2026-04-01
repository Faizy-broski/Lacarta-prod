import Link from "next/link";
import { Music2, Download, Clock, Check } from "lucide-react";

const tracks = [
  { num: 1, title: "Play It Safe", artist: "Julia Wolf", album: "Play It Safe", duration: "2:12", img: "/lacarta_images/music-1.jpg" },
  { num: 2, title: "Ocean Front Apt.", artist: "ayokay", album: "In the Shape of a Dream", duration: "2:12", img: "/lacarta_images/music-2.jpg" },
  { num: 3, title: "Free Spirit", artist: "Khalid", album: "Free Spirit", duration: "3:02", img: "/lacarta_images/music-3.jpg" },
  { num: 4, title: "La Rebelión", artist: "Joe Arroyo", album: "Rebelión", duration: "4:15", img: "/lacarta_images/music-4.jpg" },
  { num: 5, title: "Prende la Vela", artist: "Totó la Momposina", album: "Carmelina", duration: "3:48", img: "/lacarta_images/music-5.jpg" },
  { num: 6, title: "El Tiburón", artist: "El Afinaíto", album: "Champeta Clásicos", duration: "3:30", img: "/lacarta_images/music-6.jpg" },
  { num: 7, title: "La Invité a Bailar", artist: "Kevin Flórez", album: "Urban Champeta", duration: "3:55", img: "/lacarta_images/music-1.jpg" },
  { num: 8, title: "Quimbara", artist: "Celia Cruz", album: "Quimbara", duration: "4:20", img: "/lacarta_images/music-2.jpg" },
];

const sidebarLinks = [
  "CARIBBEAN RHYTHMS",
  "The most famous music festivals celebrated here",
  "Famous Artists and Musicians from the Colombian Caribbean",
  "Iconic Songs Born in Cartagena",
  "Music Venues and Spaces in Cartagena",
];

export default function SpotifyPlaylist() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Teal banner ── */}
      <div className="w-full py-2 text-center text-sm font-bold" style={{ backgroundColor: "#3bbfad", color: "#fff" }}>
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* ── Hero with teal overlay ── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: 340 }}>
        <img src="/lacarta_images/music-3.jpg" alt="Cartagena Music" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,100,90,0.72)" }} />
        <div className="relative z-10 px-4 md:px-16 py-10 md:py-16 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <Music2 size={48} strokeWidth={1.4} className="sm:hidden flex-shrink-0" style={{ color: "#fff" }} />
          <Music2 size={72} strokeWidth={1.4} className="hidden sm:block flex-shrink-0" style={{ color: "#fff", marginTop: 4 }} />
          <div>
            <h1
              className="font-antigua font-black uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", letterSpacing: "0.06em", lineHeight: 1.1 }}
            >
              Cartagena Spotify Playlist
            </h1>
            <p className="mt-2 text-lg font-semibold" style={{ color: "#e0f7f4" }}>
              Immerse yourself with the tunes of the Coastal Caribbean Gem
            </p>
            <p className="mt-3 text-sm">
              <span style={{ color: "#a8e8e0" }}><em>La Carta – Cartagena Culture &amp; Tourism</em></span>
              <span className="font-bold" style={{ color: "#fff" }}> › Cartagena Spotify Playlist</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Track list ── */}
      <section className="px-4 md:px-10 py-10 max-w-[1400px] mx-auto">
        {/* Header row – desktop only */}
        <div
          className="hidden md:grid items-center text-sm font-semibold uppercase tracking-widest pb-3 mb-2"
          style={{ gridTemplateColumns: "40px 1fr 220px 60px 60px", borderBottom: "1px solid #ddd", color: "#888" }}
        >
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Save</span>
          <Clock size={14} />
        </div>

        {tracks.map((t, i) => (
          <div
            key={t.num}
            className="flex md:grid items-center py-3 gap-3 md:gap-0"
            style={{
              gridTemplateColumns: "40px 1fr 220px 60px 60px",
              backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <span className="text-base w-7 flex-shrink-0 text-center" style={{ color: "#888" }}>{t.num}</span>
            <div className="flex items-center gap-3 flex-1 md:flex-none min-w-0">
              <img src={t.img} alt={t.title} className="w-12 h-12 object-cover rounded flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-black text-base truncate" style={{ color: "#000" }}>{t.title}</p>
                <p className="text-sm truncate" style={{ color: "#888" }}>{t.artist}</p>
              </div>
            </div>
            <span className="hidden md:block text-base" style={{ color: "#000" }}>{t.album}</span>
            <button className="hidden md:block hover:opacity-70 transition" aria-label="Download">
              <Download size={18} style={{ color: "#000" }} />
            </button>
            <span className="text-base ml-auto md:ml-0" style={{ color: "#888" }}>{t.duration}</span>
          </div>
        ))}
      </section>

      {/* ── Gold divider ── */}
      <div style={{ height: 6, backgroundColor: "#f5c542" }} />

      {/* ── CARTAGENA HELP MUSIC heading ── */}
      <div className="py-12 text-center px-6">
        <h2
          className="font-antigua font-black uppercase"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#000", letterSpacing: "0.06em" }}
        >
          Cartagena Help Music
        </h2>
      </div>

      {/* ── 2-col: sidebar + content ── */}
      <div className="px-4 md:px-10 pb-20 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12">

        {/* Sidebar */}
        <aside className="hidden md:block self-start sticky top-8">
          <p className="font-black text-base mb-4" style={{ color: "#000" }}>Cartagena its Music and Festivals</p>
          <ul className="space-y-3">
            {sidebarLinks.map((link, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#000" }} />
                <span
                  className="text-base hover:underline cursor-pointer"
                  style={{ color: i === 0 ? "#000" : "#3bbfad" }}
                >
                  {link}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="space-y-10 text-base leading-relaxed" style={{ color: "#000" }}>

          {/* Intro */}
          <div>
            <h3 className="font-antigua font-black text-2xl mb-4" style={{ color: "#000" }}>
              Cartagena: its Music and Festivals
            </h3>
            <p className="mb-4" style={{ color: "#000" }}>
              Cartagena de Indias is not only famous for its walls, its colonial architecture, and its dreamlike beaches. It is also an epicenter of sounds, melodies, and rhythms that reflect centuries of history and cultural blending.
            </p>

            {/* 2-image grid */}
            <div className="grid grid-cols-2 gap-2 my-6" style={{ maxWidth: 520 }}>
              <img src="/lacarta_images/music-1.jpg" alt="Cartagena Music" className="w-full h-48 object-cover rounded" />
              <img src="/lacarta_images/music-2.jpg" alt="Cartagena Festival" className="w-full h-48 object-cover rounded" />
            </div>

            <p className="mb-3" style={{ color: "#000" }}>
              To speak of Cartagena is to speak of its music, its festivals, and its artists. Here we evoke the sonic fusion of a diverse and vibrant past and present, since it has been a laboratory where indigenous and colonial traditions merge perfectly with Spanish and African heritage.
            </p>
            <p className="mb-3" style={{ color: "#000" }}>
              It means passing through the Caribbean flute, the African drum, the accordion, and the guitar — German and Spanish. It is to remember the Montes de María, La Niña Emilia, Magín Díaz, Toto la Momposina. The romanticism of Maty Tono Lemaitre and the immortal salsa of Álvaro José Arroyo González, "Joe Arroyo."
            </p>
            <p className="mb-3" style={{ color: "#000" }}>
              They are inspiring with their creative spirit, opening paths through their artistic initiatives and leaving the most beautiful life lessons. They may no longer be with us, but they continue to live on in the memory, the soul, and the hearts of the generations to come, leaving eternal marks.
            </p>
            <p style={{ color: "#000" }}>
              Cartagena besides having all the most beautiful destinations gathered in one place, has a variety of sounds that you are going to love. Here I tell you a little bit of all its rhythms.
            </p>
          </div>

          {/* CARIBBEAN RHYTHMS */}
          <div>
            <h3 className="font-antigua font-black uppercase text-xl mb-1" style={{ color: "#000" }}>Caribbean Rhythms</h3>
            <p className="font-semibold text-xs mb-4" style={{ color: "#000" }}>Cartagena Spotify Playlist</p>

            <img src="/lacarta_images/music-3.jpg" alt="Caribbean Rhythms" className="w-full rounded mb-5 object-cover" style={{ maxHeight: 280 }} />

            {[
              { name: "Cumbia", desc: "This is one of the most traditional and iconic rhythms of Colombia's Caribbean coast. Cumbia blends Indigenous, African, and Spanish influences, and you'll recognize it by its joyful, swaying beat—driven by drums, gaitas, and flutes. It's the kind of sound that gets into your soul and makes your feet move all on their own." },
              { name: "Champeta", desc: "Born right here in Cartagena, champeta is an urban, vibrant rhythm that mixes African beats with Caribbean and modern sounds. If you're out partying in Getsemaní or hitting up a classic local club, you're bound to hear it. Champeta is loud, proud, and full of Afro-Colombian flavor—pure energy on the dance floor." },
              { name: "Vallenato", desc: "Even though it comes from deeper inland in the Caribbean region, vallenato is also a big deal in Cartagena. With its accordion, caja, and guacharaca, it tells heartfelt stories about everyday life and love. It's romantic, nostalgic, and perfect for those late-night singalongs with a cold drink in hand." },
            ].map((r) => (
              <div key={r.name} className="mb-4">
                <p className="font-black mb-1" style={{ color: "#000" }}>{r.name}</p>
                <p style={{ color: "#000" }}>{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Festivals */}
          <div>
            <h3 className="font-antigua font-black uppercase text-xl mb-1" style={{ color: "#000" }}>
              Discover with us some of the most famous music festivals celebrated here
            </h3>
            <p className="font-semibold text-xs mb-4" style={{ color: "#000" }}>Cartagena Spotify Playlist</p>
            <p className="mb-4" style={{ color: "#000" }}>
              Cartagena has traditionally been an important musical hub of the Colombian Caribbean, home to artists who have carried Caribbean sounds and rhythms both nationally and internationally. The city remains a cultural epicenter where major music festivals bring together local and international artists. Here are some of them:
            </p>
            {[
              { name: "Caribbean Music Festival", desc: "This festival celebrates the region's musical diversity with rhythms such as champeta, reggae, calypso, and cumbia. It is held every year between June and July, bringing together artists from across the Caribbean basin." },
              { name: "Cartagena International Music Festival", desc: "Celebrated in January, this festival focuses on classical and academic music. It has been a platform for world-class symphonic artists and takes place in heritage venues such as the Adolfo Mejía Theater and several churches in the Historic Center." },
              { name: "Palenque Drum Festival", desc: "In San Basilio de Palenque, just 50 minutes from Cartagena, the Palenque Drum Festival is held to honor African music, drums, bullerengue, and oral tradition. Many Cartagena musicians either participate in or draw inspiration from this tradition." },
            ].map((f) => (
              <div key={f.name} className="mb-4">
                <p className="font-black mb-1" style={{ color: "#000" }}>{f.name}</p>
                <p style={{ color: "#000" }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Famous Artists */}
          <div>
            <h3 className="font-antigua font-black uppercase text-xl mb-1" style={{ color: "#000" }}>
              Famous Artists and Musicians from the Colombian Caribbean
            </h3>
            <p className="font-semibold text-xs mb-4" style={{ color: "#000" }}>Cartagena Spotify Playlist</p>
            <img src="/lacarta_images/music-4.jpg" alt="Artists" className="w-full rounded mb-5 object-cover" style={{ maxHeight: 260 }} />
            {[
              { name: "Joe Arroyo", desc: "He is considered one of the greatest exponents of salsa and Colombian tropical music. His biggest hits include La rebelión, Tal para cual, and En Barranquilla me quedo, among others. Without a doubt, he is one of the most representative artists of the Caribbean region." },
              { name: "Totó la Momposina", desc: "Known for songs like Prende la vela and El pescador, she is an iconic figure of traditional Colombian Caribbean music. Her repertoire combines rhythms such as cumbia, bullerengue, and chalupa." },
              { name: "Petrona Martínez", desc: "Known as the Queen of Bullerengue, she was born in San Basilio de Palenque, a town near Cartagena, and is considered one of the most authentic voices of Colombian Caribbean folklore. We recommend listening to Las penas alegres and La vida vale la pena." },
              { name: 'Mr. Black, "El Presidente de la Champeta"', desc: "One of the leading exponents of champeta. Songs like El Serrucho, Bandida, and Tú me partiste el corazón (remix with Maluma) have taken him to international recognition." },
              { name: "Kevin Flórez", desc: "Known as the King of Urban Champeta, Kevin Flórez has modernized the genre by integrating more urban sounds without losing its Caribbean essence. Hits like La invité a bailar and Con ella me gusta will have you dancing all night in Cartagena's iconic clubs." },
              { name: "Lilibeth Llerena", desc: "An emerging female voice who has fused champeta with pop. She is one of many women seeking to break paradigms and carve a path in a genre historically dominated by men." },
              { name: "Maía", desc: "Although many associate her with Latin pop, Maía has roots in Cartagena. Her career has been marked by ballads and fusions that include Caribbean influences. Recommended songs: Ingenuidad, Niña bonita, and Se me acabó el amor." },
            ].map((a) => (
              <div key={a.name} className="mb-4">
                <p className="font-black mb-1" style={{ color: "#000" }}>{a.name}:</p>
                <p style={{ color: "#000" }}>{a.desc}</p>
              </div>
            ))}
          </div>

          {/* Iconic Songs */}
          <div>
            <h3 className="font-antigua font-black uppercase text-xl mb-3" style={{ color: "#000" }}>
              Iconic Songs Born in Cartagena
            </h3>
            <p className="mb-4" style={{ color: "#000" }}>
              Get ready for your trip to Cartagena and take a look at the songs you'll definitely dance to at the city's clubs, or hear playing on every corner of "La Heroica."
            </p>
            {[
              { genre: "Champeta (Local Genre)", songs: ["El Tiburón – El Afinaíto", "El estuche de Palo – Mr. Black 'El Presidente'", "La Novela – Kevin Flórez"] },
              { genre: "Urban Reggaetón", songs: ["OHNANA – Kapo", "La Plena – W Sound, Beéle & Ovy on the Drums", "Verano Rosa – Karol G & Feid"] },
              { genre: "Classic Salsa", songs: ["La Rebelión – Joe Arroyo (a true Cartagena anthem)", "Quimbara – Celia Cruz", "Tal para cual – Joe Arroyo"] },
            ].map((g) => (
              <div key={g.genre} className="mb-4">
                <p className="font-black mb-1" style={{ color: "#000" }}>{g.genre}</p>
                <ul className="list-disc list-inside space-y-0.5 pl-2">
                  {g.songs.map((s) => <li key={s} style={{ color: "#000" }}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Music Venues */}
          <div>
            <h3 className="font-antigua font-black uppercase text-xl mb-1" style={{ color: "#000" }}>
              Music Venues and Spaces in Cartagena
            </h3>
            <p className="font-semibold text-xs mb-4" style={{ color: "#000" }}>Cartagena Spotify Playlist</p>
            <img src="/lacarta_images/music-5.jpg" alt="Music Venues" className="w-full rounded mb-5 object-cover" style={{ maxHeight: 260 }} />
            {[
              { name: "Bazurto Social Club", desc: "Located in Getsemaní, this is a spot where music, tradition, and great food come together for a truly unique experience. Live music, local bands, and carefully selected sounds ranging from salsa brava, boogaloo, reggae, cumbia, porro, champeta, hip hop, and dancehall." },
              { name: "Getsemaní", desc: "This neighborhood is home to bars, cultural houses, and live music performances, where you can hear everything from jazz to Afro-Colombian sounds." },
              { name: "Café Havana", desc: "A legendary venue in Getsemaní where champeta blends with salsa and other Caribbean rhythms. One of the most iconic nightlife spots in Cartagena, it's famous for its Cuban cocktails and live music—definitely a must on your checklist." },
              { name: "Plaza de la Trinidad", desc: "Street musicians, drums, freestyle sessions, and spontaneous dances—this square embodies the free musical spirit of the city. It's the cultural and social epicenter of the neighborhood, where every night locals and tourists gather to enjoy Cartagena's vibrant nightlife." },
            ].map((v) => (
              <div key={v.name} className="mb-4">
                <p className="font-black mb-1" style={{ color: "#000" }}>{v.name}</p>
                <p style={{ color: "#000" }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Musical Identity */}
          <div>
            <h3 className="font-antigua font-black uppercase text-xl mb-1" style={{ color: "#000" }}>
              Cartagena's Musical Identity
            </h3>
            <p className="font-semibold text-xs mb-4" style={{ color: "#000" }}>Cartagena Spotify Playlist</p>
            <img src="/lacarta_images/music-6.jpg" alt="Musical Identity" className="w-full rounded mb-5 object-cover" style={{ maxHeight: 260 }} />
            <div className="space-y-3" style={{ color: "#000" }}>
              <p>Music in Cartagena is not just entertainment—it's a living expression of Afro-Caribbean identity, colonial legacy, and cultural resistance. From gaitas (traditional flutes) to digital beats, there's a constant evolution that never forgets its roots.</p>
              <p>Champeta, for instance, has been reclaimed as intangible cultural heritage of the city. What was once marginalized is now a source of pride.</p>
              <p>Young Cartageneros are blending genres, producing in home studios, filming music videos with their phones, and sharing their creations on social media. There's an alternative movement aiming to be heard beyond the neighborhood.</p>
              <p>Cartagena has everything to become a true musical capital of the Caribbean. Its diversity, African roots, closeness to Palenque, urban energy, and musicians trained both on the streets and in academies make the city a constant sound laboratory.</p>
              <p>Music in Cartagena is a multisensory experience. It's seeing a child playing drums on a corner in Getsemaní, dancing champeta on the sand at Playa Blanca, listening to jazz in a colonial church, or being moved by a cumbia in a procession.</p>
              <p>Cartagena sings, sounds, vibrates. And if you're lucky enough to visit, let yourself be carried away by its rhythm… because here, even the stones have their own beat.</p>
              <p>
                If you want to know more about Cartagena, stay tuned to{" "}
                <Link href="/blog" className="underline hover:opacity-80">La Carta Blog</Link>.
              </p>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
