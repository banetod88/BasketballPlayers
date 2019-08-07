using dotNet514072019.Interface;
using dotNet514072019.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace dotNet514072019.Repository
{
    public class KluboviRepository : IKluboviRepository, IDisposable
    {

        IKluboviRepository _repositoryKlubovi { get; set; }
        private ApplicationDbContext db = new ApplicationDbContext();

        public void Dispose(bool disposing)
        {
            if (disposing)
            {
                if(db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IEnumerable<KosarkaskiKlub> GetAll()
        {
            return db.KosarkaskiKlub;
        }

        public KosarkaskiKlub GetById(int id)
        {
            return db.KosarkaskiKlub.FirstOrDefault(k => k.KosarkaskiKlubId == id);
        }

        public IEnumerable<KosarkaskiKlub> GetEkstremi()
        {/**/
            List<KosarkaskiKlub> ekstremi = new List<KosarkaskiKlub>();
            
            var extremMin = db.KosarkaskiKlub.OrderBy(k => k.KosarkaskiKlubBrojTrofeja).FirstOrDefault();
            var extremMax = db.KosarkaskiKlub.OrderByDescending(k => k.KosarkaskiKlubBrojTrofeja).FirstOrDefault();

            ekstremi.Add(extremMin); 
            ekstremi.Add(extremMax);

            return ekstremi;

        }
    }
}