using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace dotNet514072019.Models
{
    public class Sadrzaj
    {
        public int SadrzajId { get; set; }
        public string SadrzajSlikaLink { get; set; }
        public string SadrzajTekst { get; set; }
        public bool SadrzajArhiviran { get; set; }

        public int KosarkasId { get; set; }
        public Kosarkas kosarkas { get; set; }
    }
}