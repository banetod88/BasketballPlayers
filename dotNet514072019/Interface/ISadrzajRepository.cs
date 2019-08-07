using dotNet514072019.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotNet514072019.Interface
{
    public interface ISadrzajRepository
    {
        IEnumerable<Sadrzaj> GetAll();
        IEnumerable<Sadrzaj> GetArhiva();
        Sadrzaj GetById(int id);
        void Add(Sadrzaj sadrzaj);
        void Update(Sadrzaj sadrzaj);
        void ToArchive(int id);
        void Delete(Sadrzaj sadrzaj);

    }
}
