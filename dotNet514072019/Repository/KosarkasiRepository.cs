using dotNet514072019.Interface;
using dotNet514072019.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace dotNet514072019.Repository
{
    public class KosarkasiRepository : IKosarkasiRepository, IDisposable
    {

        IKosarkasiRepository _repositoryKosarkasi { get; set; }
        private ApplicationDbContext db = new ApplicationDbContext();

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
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


        public IEnumerable<Kosarkas> GetAll()
        {

             return db.Kosarkas.Include("kosarkaskiKlub").OrderByDescending(k => k.KosarkasProsecanBrojPoena);

        }

        public IEnumerable<Kosarkas> GetPoGodini(int? godine = 0)
        {
            return db.Kosarkas.Include("kosarkaskiKlub").Where(k => k.KosarkasGodinaRodjenja < godine).OrderBy(k => k.KosarkasGodinaRodjenja);
        }

        public Kosarkas GetById(int id)
        {
            return db.Kosarkas.Include("kosarkaskiKlub").FirstOrDefault(k => k.KosarkasId==id);
        }

        public void Add(Kosarkas kosarkas)
        {
            db.Kosarkas.Add(kosarkas);
            db.SaveChanges();
        }

        public void Update(Kosarkas kosarkas)
        {
            db.Entry(kosarkas).State = System.Data.Entity.EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
        }

        public void Delete(Kosarkas kosarkas)
        {
            db.Kosarkas.Remove(kosarkas);
            db.SaveChanges();
        }

        public IEnumerable<Kosarkas> PoUtakmiacam(int? najmanje = null, int? najvise = null)
        {
            return db.Kosarkas.Include("kosarkaskiKlub").Where(k => k.KosarkasBrojUtakmica > najmanje && k.KosarkasBrojUtakmica < najvise).OrderByDescending(k => k.KosarkasProsecanBrojPoena);
        }

        public IEnumerable<Kosarkas> GetAll(int? godine = null)
        {
            throw new NotImplementedException();
        }




    }
}