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
    public class KosarkasiController : ApiController
    {
        IKosarkasiRepository _repository { get; set; }

        public KosarkasiController(IKosarkasiRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Kosarkas> Get(int? godine=null)
        {
            if (godine == null) { 
            return _repository.GetAll();
            }
            else {
                return _repository.GetPoGodini(godine);
            }
        }

        public IHttpActionResult Get(int id)
        {
            var kosarkas = _repository.GetById(id);
            if (kosarkas == null)
            {
                return NotFound();
            }
            return Ok(kosarkas);
        }



        //[Authorize]
        public IHttpActionResult Post(Kosarkas kosarkas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repository.Add(kosarkas);
            return CreatedAtRoute("DefaultApi", new { id = kosarkas.KosarkasId}, kosarkas);
        }





        public IHttpActionResult Put(int id, Kosarkas kosarkas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != kosarkas.KosarkasId)
            {
                return BadRequest();
            }

            try
            {
                _repository.Update(kosarkas);
            }
            catch
            {
                return BadRequest();
            }

            return Ok(kosarkas);
        }


        //[Authorize]
        public IHttpActionResult Delete(int id)
        {
            var kosarkas = _repository.GetById(id);
            if (kosarkas == null)
            {
                return NotFound();
            }

            _repository.Delete(kosarkas);
            return Ok();
        }


        //[Authorize]
        [HttpPost]
        [Route("api/pretraga")]
        public IHttpActionResult Post(PretragaDTO pretragaDTO)
        {
            var kosarkas = _repository.PoUtakmiacam(pretragaDTO.najmanje, pretragaDTO.najvise);
            if (kosarkas == null)
            {
                return NotFound();
            }
            return Ok(kosarkas);
        }



    }
}
