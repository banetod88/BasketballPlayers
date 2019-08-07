using dotNet514072019.Interface;
using dotNet514072019.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace dotNet514072019.Repository
{
    public class SadrzajRepository : ISadrzajRepository, IDisposable
    {

        ISadrzajRepository sadrzajRepository { get; set; }

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


        public IEnumerable<Sadrzaj> GetAll()
        {
            return db.Sadrzaj.Include("kosarkas").Where(s=>s.SadrzajArhiviran==false);
        }

        public Sadrzaj GetById(int id)
        {
            return db.Sadrzaj.Include("kosarkas").Where(s => s.SadrzajId == id).FirstOrDefault();
        }

        public void Update(Sadrzaj sadrzaj)
        {
            db.Entry(sadrzaj).State = System.Data.Entity.EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
        }

        public IEnumerable<Sadrzaj> GetArhiva()
        {
            return db.Sadrzaj.Include("kosarkas").Where(s => s.SadrzajArhiviran == true);
        }


        public void ToArchive(int id)
        {

            var instanca = db.Sadrzaj.Include("kosarkas").Where(s => s.SadrzajId == id).FirstOrDefault();
            instanca.SadrzajArhiviran = true;


            db.Entry(instanca).State = System.Data.Entity.EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }

        }

        public void Add(Sadrzaj sadrzaj)
        {
            db.Sadrzaj.Add(sadrzaj);
            db.SaveChanges();
        }

        public void Delete(Sadrzaj sadrzaj)
        {
            db.Sadrzaj.Remove(sadrzaj);
            db.SaveChanges();
        }
    }
}