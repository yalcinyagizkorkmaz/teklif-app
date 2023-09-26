using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Base.Base;
using webapi.Base.Base.Grid;
using webapi.Entity;
using webapi.Helper.Base;
using webapi.ViewModel.General.Grid;
using webapi.ViewModel;
using webapi.ViewModel.Musteri;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusteriController : BaseWebApiController
    {
        public MusteriController(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        [HttpPost("CreateOrUpdate")]
        public ApiResult CreateOrUpdate([FromBody] MusteriCreateVM dataVM)
        {
            if (!ModelState.IsValid)
                return new ApiResult { Result = false, Message = "Form'da doldurulmayan alanlar mevcut,lütfen doldurun." };

            if (_unitOfWork.Repository<Musteri>().Where(x => x.Id != dataVM.Id).Any(x => x.Email == dataVM.Email || x.TelefonNumarasi == dataVM.TelefonNumarasi   ))
            {
                return new ApiResult { Result = false, Message = "Daha önce eklenmiş" };
            }

            Musteri data = new Musteri();

            data.Id = dataVM.Id;
            data.Adi = dataVM.Adi;
            data.Soyadi = dataVM.Soyadi;
            data.FirmaId = dataVM.FirmaId;
            data.Email = dataVM.Email;
            data.TelefonNumarasi = dataVM.TelefonNumarasi;


            _unitOfWork.Repository<Musteri>().InsertOrUpdate(data);
            _unitOfWork.SaveChanges();
            return new ApiResult { Result = true };
        }

        [HttpGet("Delete")]
        public ApiResult Delete(int id)
        {
            var data = _unitOfWork.Repository<Musteri>().GetById(id);
            //if (_unitOfWork.Repository<Kullanici>().Any(i => i.RolId == id))
            //{
            //    return new ApiResult { Result = false, Message = "Rol kullanıcı tarafından kullanılmaktadır." };
            //}

            if (data == null)
            {
                return new ApiResult { Result = false, Message = "Belirtilen müşteri bulunamadı." };
            }

            _unitOfWork.Repository<Musteri>().Delete(data.Id);
            _unitOfWork.SaveChanges();
            return new ApiResult { Result = true };
        }

        [HttpPost("GetGrid")]
        public ApiResult<GridResultModel<MusteriGridVM>> GetGrid()
        {
            var query = _unitOfWork.Repository<Musteri>().Include( x => x.Firma )
            .Select(x => new MusteriGridVM
            {
                Id = x.Id,
                Adi = x.Adi,
                Soyadi = x.Soyadi,
                FirmaAdi = x.Firma.FirmaAdi,
                Email = x.Email,
                TelefonNumarasi = x.TelefonNumarasi,
            });
            var rest = query.ToDataListRequest(Request.ToRequestFilter());

            return new ApiResult<GridResultModel<MusteriGridVM>> { Data = rest, Result = true };
        }

        [HttpPost("Get")]
        public ApiResult<MusteriCreateVM> Get(int id)
        {
            var musteri = _unitOfWork.Repository<Musteri>().GetById(id);
            MusteriCreateVM musteriVM = new MusteriCreateVM
            {
                Id = musteri.Id,
                Adi = musteri.Adi,
                Soyadi = musteri.Soyadi,
                FirmaId = musteri.FirmaId,
                Email = musteri.Email,
                TelefonNumarasi = musteri.TelefonNumarasi
            };
            return new ApiResult<MusteriCreateVM> { Data = musteriVM, Result = true };
        }

    }
}
