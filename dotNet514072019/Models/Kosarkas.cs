using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace dotNet514072019.Models
{
    public class Kosarkas
    {
        public int KosarkasId { get; set; }
        [Required]
        [StringLength(40)]
        public string KosarkasImeIPrezime { get; set; }
        [Required]
        [Range(1975, 2000)]
        public int KosarkasGodinaRodjenja { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int KosarkasBrojUtakmica { get; set; }
        [Required]
        [Range(0,30)]
        public decimal KosarkasProsecanBrojPoena { get; set; }

        public int KosarkaskiKlubId { get; set; }
        public KosarkaskiKlub kosarkaskiKlub { get; set; }
    }
}