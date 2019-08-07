using dotNet514072019.Interface;
using dotNet514072019.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
//using System.Web.Mvc;
using System.Web.Http;

namespace dotNet514072019.Controllers
{
    public class SadrzajController : ApiController
    {
        ISadrzajRepository _repository { get; set; }

        public SadrzajController(ISadrzajRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Sadrzaj> Get()
        {
            return _repository.GetAll();
        }

        [HttpGet]
        [Route("api/sadrzaj/arhiva")]
        public IEnumerable<Sadrzaj> GetArhivirane()
        {
            return _repository.GetArhiva();
        }

        public IHttpActionResult Get(int id)
        {
            var sadrzaj = _repository.GetById(id);
            if (sadrzaj == null)
            {
                return NotFound();
            }
            return Ok(sadrzaj);
        }
        /* verzija pre izmene    */
        [Route("api/sadrzaj/izmeni/{id}")]
        public IHttpActionResult Put(int id, Sadrzaj sadrzaj)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sadrzaj.SadrzajId)
            {
                return BadRequest();
            }

            try
            {
                _repository.Update(sadrzaj);
            }
            catch
            {
                return BadRequest();
            }

            return Ok(sadrzaj);
        }

    

        public IHttpActionResult Put(int id, SadrzajDTO_Post sadrzajDTO_Post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sadrzajDTO_Post.SadrzajId)
            {
                return BadRequest();
            }

            var sadrzaj = _repository.GetById(sadrzajDTO_Post.SadrzajId);
            sadrzaj.SadrzajId = sadrzajDTO_Post.SadrzajId;
            sadrzaj.SadrzajTekst = sadrzajDTO_Post.SadrzajTekst;
            sadrzaj.KosarkasId = sadrzajDTO_Post.KosarkasId;

            try
            {
                _repository.Update(sadrzaj);
            }
            catch
            {
                return BadRequest();
            }

            return Ok(sadrzaj);
        }


        //[Authorize]
        public IHttpActionResult Post(Sadrzaj sadrzaj)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repository.Add(sadrzaj);
            return CreatedAtRoute("DefaultApi", new { id = sadrzaj.SadrzajId }, sadrzaj);
        }



        [HttpPatch]
        [Route("api/sadrzaj/arhiviraj/{id}")]
        public IHttpActionResult ToArchive(int id)
        {

            try
            {
                _repository.ToArchive(id);
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }



        [HttpPost]
        [Route("api/sadrzaj/uploadSlike/{id}")]
        public async Task<string> UploadFile(int id) 
        {
            var ctx = HttpContext.Current;
            var root = ctx.Server.MapPath("~/Slike");
            var provider =
                new MultipartFormDataStreamProvider(root);

            try
            {
                await Request.Content
                    .ReadAsMultipartAsync(provider);

                foreach (var file in provider.FileData)
                {
                    var name = file.Headers
                        .ContentDisposition
                        .FileName;

                    // remove double quotes from string.
                    name = name.Trim('"');
                    name= string.Concat(Path.GetFileNameWithoutExtension(name),DateTime.Now.ToString("yyyyMMddHHmmssfff"),Path.GetExtension(name));

                   // name += DateTime.Now.ToString("yyyyMMddHHmmssfff");

                    var localFileName = file.LocalFileName;
                    var filePath = Path.Combine(root, name);

                    File.Move(localFileName, filePath);

                    var sadrzaj = _repository.GetById(id);
                    sadrzaj.SadrzajSlikaLink = "/Slike/" + name;

                    _repository.Update(sadrzaj);


                }
            }
            catch (Exception e)
            {
                return $"Error: {e.Message}";
            }

            return "File uploaded!";
        }


        

        [HttpPost]
        [Route("api/sadrzaj/uploadNovogSadrzaja")]
        public async Task<string> UploadNovogSadrzaja(object sender, SadrzajNewUpload sadrzajNewUpload) // NEDOSTAJE NACIN DA SE PROSLEDI ID!!!!!!!!!!!!!!!!!!!!!!!!!!
        {
            var ctx = HttpContext.Current;
            var root = ctx.Server.MapPath("~/Slike");
            var provider =
                new MultipartFormDataStreamProvider(root);

            try
            {
                await Request.Content
                    .ReadAsMultipartAsync(provider);

                foreach (var file in provider.FileData)
                {
                    var name = file.Headers
                        .ContentDisposition
                        .FileName;

                    // remove double quotes from string.
                    name = name.Trim('"');
                    name = string.Concat(Path.GetFileNameWithoutExtension(name), DateTime.Now.ToString("yyyyMMddHHmmssfff"), Path.GetExtension(name));

                    // name += DateTime.Now.ToString("yyyyMMddHHmmssfff");

                    var localFileName = file.LocalFileName;
                    var filePath = Path.Combine(root, name);

                    File.Move(localFileName, filePath);

                    Sadrzaj sadrzaj = new Sadrzaj();
                    sadrzaj.KosarkasId = sadrzajNewUpload.KosarkasId;
                    sadrzaj.SadrzajTekst = sadrzajNewUpload.SadrzajTekst;
                    sadrzaj.SadrzajArhiviran = false;
                    sadrzaj.SadrzajSlikaLink = name;
                    sadrzaj.SadrzajSlikaLink = "/Slike/" + name;

                    _repository.Add(sadrzaj);


                }
            }
            catch (Exception e)
            {
                return $"Error: {e.Message}";
            }

            return "File uploaded!";
        }


        //[Authorize]
        public IHttpActionResult Delete(int id)
        {
            var sadrzaj = _repository.GetById(id);
            if (sadrzaj == null)
            {
                return NotFound();
            }

            _repository.Delete(sadrzaj);
            return Ok();
        }




    }
}
