using dotNet514072019.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotNet514072019.Interface
{
    public interface IKluboviRepository
    {
        IEnumerable<KosarkaskiKlub> GetAll();
        KosarkaskiKlub GetById(int id);
        IEnumerable<KosarkaskiKlub> GetEkstremi();
    }
}
