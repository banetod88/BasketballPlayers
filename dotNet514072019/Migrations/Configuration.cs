namespace dotNet514072019.Migrations
{
    using dotNet514072019.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<dotNet514072019.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(dotNet514072019.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            context.Kosarkas.AddOrUpdate(x => x.KosarkasId,
                new Kosarkas() { KosarkasId=1, KosarkasImeIPrezime= "Dirk Nowitzki", KosarkasGodinaRodjenja= 1978, KosarkasBrojUtakmica =1522, KosarkasProsecanBrojPoena=20.7m, KosarkaskiKlubId=2},
                new Kosarkas() { KosarkasId=2, KosarkasImeIPrezime="LeBron James", KosarkasGodinaRodjenja=1984, KosarkasBrojUtakmica=1198, KosarkasProsecanBrojPoena=27.2m, KosarkaskiKlubId=4},
                new Kosarkas() { KosarkasId=3, KosarkasImeIPrezime="Bojan Bogdanovic", KosarkasGodinaRodjenja=1989, KosarkasBrojUtakmica=105, KosarkasProsecanBrojPoena=14.8m, KosarkaskiKlubId=3},
                new Kosarkas() { KosarkasId=4, KosarkasImeIPrezime="Nemanja Bjelica", KosarkasGodinaRodjenja=1988, KosarkasBrojUtakmica=25, KosarkasProsecanBrojPoena=10.8m, KosarkaskiKlubId=1},
                new Kosarkas() { KosarkasId=5, KosarkasImeIPrezime= "Carmelo Anthony", KosarkasGodinaRodjenja=1984, KosarkasBrojUtakmica=1064, KosarkasProsecanBrojPoena=24.0m, KosarkaskiKlubId=5},
                new Kosarkas() { KosarkasId=6, KosarkasImeIPrezime= "Nikola Jokic", KosarkasGodinaRodjenja=1995, KosarkasBrojUtakmica=308, KosarkasProsecanBrojPoena=28.3m, KosarkaskiKlubId=6}
                
              );

            context.KosarkaskiKlub.AddOrUpdate(x=> x.KosarkaskiKlubId,
                new KosarkaskiKlub() { KosarkaskiKlubId=1, KosarkaskiKlubNaziv="Sacramento Kings", KosarkaskiKlubLiga="NBA", KosarkaskiKlubGodinaOsnivanja=1985, KosarkaskiKlubBrojTrofeja=5},
                new KosarkaskiKlub() { KosarkaskiKlubId=2, KosarkaskiKlubNaziv="Dallas Mavericks", KosarkaskiKlubLiga="NBA", KosarkaskiKlubGodinaOsnivanja=1980, KosarkaskiKlubBrojTrofeja=6},
                new KosarkaskiKlub() { KosarkaskiKlubId=3, KosarkaskiKlubNaziv="Indiana Pacers", KosarkaskiKlubLiga="NBA", KosarkaskiKlubGodinaOsnivanja=1967, KosarkaskiKlubBrojTrofeja=13},
                new KosarkaskiKlub() { KosarkaskiKlubId=4, KosarkaskiKlubNaziv="LA Lakers", KosarkaskiKlubLiga="NBA", KosarkaskiKlubGodinaOsnivanja=1947, KosarkaskiKlubBrojTrofeja=16},
                new KosarkaskiKlub() { KosarkaskiKlubId=5, KosarkaskiKlubNaziv= "Houston Rockets", KosarkaskiKlubLiga="NBA", KosarkaskiKlubGodinaOsnivanja=1967, KosarkaskiKlubBrojTrofeja=2},
                new KosarkaskiKlub() { KosarkaskiKlubId=6, KosarkaskiKlubNaziv= "Denver Nuggets", KosarkaskiKlubLiga="NBA", KosarkaskiKlubGodinaOsnivanja=1967, KosarkaskiKlubBrojTrofeja=0}
              );

            context.Sadrzaj.AddOrUpdate(x => x.SadrzajId,
                new Sadrzaj() { SadrzajId=1, SadrzajSlikaLink="xxxxxx", SadrzajTekst= "Dirk Werner Nowitzki (German pronunciation: [ˈdɪʁk ˈvɛʁnɐ noˈvɪtski]) (born June 19, 1978) is a German retired professional basketball player. An alumnus of Röntgen Gymnasium and the DJK Würzburg basketball club, Nowitzki was chosen as the ninth pick in the 1998 NBA draft by the Milwaukee Bucks and was immediately traded to the Dallas Mavericks, where he played his entire 21-year National Basketball Association (NBA) career. In the NBA, he won the league Most Valuable Player (MVP) award in 2007, was an NBA champion in 2011, and was a 14-time All-Star.", SadrzajArhiviran=false, KosarkasId=1 },
                new Sadrzaj() { SadrzajId=2, SadrzajSlikaLink="xxxxxx", SadrzajTekst= "LeBron Raymone James Sr. (/ləˈbrɒn/; born December 30, 1984) is an American professional basketball player for the Los Angeles Lakers of the National Basketball Association (NBA). His accomplishments include three NBA championships, four NBA Most Valuable Player Awards, three NBA Finals MVP Awards, and two Olympic gold medals. James has appeared in fifteen NBA All-Star Games and been named NBA All-Star MVP three times. He won the 2008 NBA scoring title, is the all-time NBA playoffs scoring leader, and is fourth in all-time career points scored. He has been voted onto the All-NBA First Team twelve times and the All-Defensive First Team five times. He is widely regarded as one of the greatest basketball players of all time.", SadrzajArhiviran=false, KosarkasId=2 },
                new Sadrzaj() { SadrzajId=3, SadrzajSlikaLink="xxxxxx", SadrzajTekst= "Bojan Bogdanović (Croatian pronunciation: [ˌbǒjan boɡˈdǎːnoʋit͜ɕ]; born April 18, 1989) is a Croatian professional basketball player for the Utah Jazz of the National Basketball Association (NBA). He also represents the Croatian national basketball team. Standing at 2.03 m (6 ft 8 in), he plays at the shooting guard and small forward positions. He has also played with the Brooklyn Nets, Washington Wizards, and Indiana Pacers.", SadrzajArhiviran=false, KosarkasId=3 },
                new Sadrzaj() { SadrzajId=4, SadrzajSlikaLink="xxxxxx", SadrzajTekst= "Nemanja Bjelica (Serbian Cyrillic: Немања Бјелица, pronounced [němaɲa bjělitsa], born May 9, 1988) is a Serbian professional basketball player for the Sacramento Kings of the National Basketball Association (NBA). The power forward has also played on the Serbian national basketball team. His versatility and ball handling skills allow him to assume the point forward role on the court. Bjelica was an All-Euroleague First Team selection as well as the Euroleague MVP in 2015.", SadrzajArhiviran=false, KosarkasId=4 },
                new Sadrzaj() { SadrzajId=5, SadrzajSlikaLink="xxxxxx", SadrzajTekst= "Carmelo Kyam Anthony (born May 29, 1984)[1] is an American professional basketball player who last played for the Houston Rockets of the National Basketball Association (NBA). He has been named an NBA All-Star ten times and an All-NBA Team member six times. He played college basketball for the Syracuse Orange, winning a national championship as a freshman in 2003 while being named the NCAA Tournament's Most Outstanding Player.", SadrzajArhiviran=false, KosarkasId=5 },
                new Sadrzaj() { SadrzajId=6, SadrzajSlikaLink= "/Slike/220px-Nikola_Jokic_(40980299891).jpg", SadrzajTekst= "Nikola Jokić (Serbian Cyrillic: Никола Јокић; born February 19, 1995) is a Serbian professional basketball player for the Denver Nuggets of the National Basketball Association (NBA). He also represents the Serbian national basketball team internationally. Standing at 7 ft 0 in (2.13 m), he plays at the center position. He was selected with the 41st overall pick by the Denver Nuggets in the 2014 NBA draft. He received his first All-Star selection in 2019.", SadrzajArhiviran=false, KosarkasId=6 }
                
                
                );


        }
    }
}
