using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace dotNet514072019.Models
{
    public class KosarkaskiKlub
    {
        public int KosarkaskiKlubId { get; set; }
        [Required]
        [StringLength(50)]
        public string KosarkaskiKlubNaziv { get; set; }
        [StringLength(3,MinimumLength =3)]
        public string KosarkaskiKlubLiga { get; set; }
        [Required]
        [Range(1945,2000)]
        public int KosarkaskiKlubGodinaOsnivanja { get; set; }
        [Required]
        [Range(0,19)]
        public int KosarkaskiKlubBrojTrofeja { get; set; }

    }
}