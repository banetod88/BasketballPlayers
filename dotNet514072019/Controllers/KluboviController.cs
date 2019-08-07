using dotNet514072019.Interface;
using dotNet514072019.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace dotNet514072019.Controllers
{
    public class KluboviController : ApiController
    {
        IKluboviRepository _repository { get; set; }

        public KluboviController(IKluboviRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<KosarkaskiKlub> Get()
        {
            return _repository.GetAll();
        }

        public IHttpActionResult Get(int id)
        {
            var klubovi = _repository.GetById(id);
            if (klubovi == null)
            {
                return NotFound();
            }
            return Ok(klubovi);
        }

        [Route("api/ekstremi")]
        public IEnumerable<KosarkaskiKlub> GetEkstremi()
        {
            return _repository.GetEkstremi();
        }


    }
}
