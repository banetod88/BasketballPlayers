using dotNet514072019.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotNet514072019.Interface
{
    public interface IKosarkasiRepository
    {
        IEnumerable<Kosarkas> GetAll();
        Kosarkas GetById(int id);
        void Add(Kosarkas kosarkas);
        void Update(Kosarkas kosarkas);
        void Delete(Kosarkas kosarkas);
        IEnumerable<Kosarkas> PoUtakmiacam(int? najmanje = null, int? najvise = null);

        IEnumerable<Kosarkas> GetPoGodini(int? godine = 0);


    }
}
