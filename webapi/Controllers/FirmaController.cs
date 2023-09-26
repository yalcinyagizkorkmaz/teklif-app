using Microsoft.AspNetCore.Mvc;
using webapi.Base.Base;
using webapi.Base.Base.Grid;
using webapi.Entity;
using webapi.Helper.Base;
using webapi.ViewModel.General.Grid;
using webapi.ViewModel.Firma;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FirmaController : BaseWebApiController
    {
        public FirmaController(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        [HttpPost("CreateOrUpdate")]
        public ApiResult CreateOrUpdate([FromBody] FirmaCreateVM dataVM)
        {
            if (!ModelState.IsValid)
                return new ApiResult { Result = false, Message = "Form'da doldurulmayan alanlar mevcut,lütfen doldurun." };
            Firma data;
            if (dataVM.Id > 0)
            {
                data = _unitOfWork.Repository<Firma>().GetById(dataVM.Id);
                data.FirmaAdi = dataVM.FirmaAdi;
                data.FirmaFaaliyetAlani = dataVM.FirmaFaaliyetAlani;
                data.FirmaMerkezi=dataVM.FirmaMerkezi;
                data.FirmaEmail = dataVM.FirmaEmail;
                data.FirmaTelefonNumarasi = dataVM.FirmaTelefonNumarasi;
            }
            else
            {
                data = new Firma()
                {
                    FirmaAdi = dataVM.FirmaAdi,
                   FirmaFaaliyetAlani = dataVM.FirmaFaaliyetAlani,
                    FirmaMerkezi=dataVM.FirmaMerkezi,
                    FirmaEmail = dataVM.FirmaEmail,
                    FirmaTelefonNumarasi = dataVM.FirmaTelefonNumarasi,
                };
                if (_unitOfWork.Repository<Firma>().Any(x => x == data))
                {
                    return new ApiResult { Result = false, Message = "Daha önce eklenmiş" };
                }
            }

            _unitOfWork.Repository<Firma>().InsertOrUpdate(data);
            _unitOfWork.SaveChanges();
            return new ApiResult { Result = true };
        }

        [HttpGet("Delete")]
        public ApiResult Delete(int id)
        {
            var data = _unitOfWork.Repository<Firma>().GetById(id);
            //if (_unitOfWork.Repository<Kullanici>().Any(i => i.RolId == id))
            //{
            //    return new ApiResult { Result = false, Message = "Rol kullanıcı tarafından kullanılmaktadır." };
            //}
            
            if (data == null)
            {
                return new ApiResult { Result = false, Message = "Belirtilen müşteri bulunamadı." };
            }

            _unitOfWork.Repository<Firma>().Delete(data.Id);
            _unitOfWork.SaveChanges();
            return new ApiResult { Result = true };
        }

        [HttpPost("GetGrid")]
        public ApiResult<GridResultModel<FirmaGridVM>> GetGrid()
        {
            var query = _unitOfWork.Repository<Firma>()
            .Select(x => new FirmaGridVM
            {
                Id = x.Id,
                FirmaAdi = x.FirmaAdi,
                FirmaFaaliyetAlani=x.FirmaFaaliyetAlani,
                FirmaMerkezi=x.FirmaMerkezi,
                FirmaEmail = x.FirmaEmail,
                FirmaTelefonNumarasi = x.FirmaTelefonNumarasi,
            });
            var rest = query.ToDataListRequest(Request.ToRequestFilter());

            return new ApiResult<GridResultModel<FirmaGridVM>> { Data = rest, Result = true };
        }

        [HttpPost("Get")]
        public ApiResult<FirmaGridVM> Get(int id)
        {
            var firma = _unitOfWork.Repository<Firma>().GetById(id);
            FirmaGridVM firmaVM = new FirmaGridVM
            {
                Id = firma.Id,
                FirmaAdi = firma.FirmaAdi,
                FirmaFaaliyetAlani= firma.FirmaFaaliyetAlani,
                FirmaMerkezi=firma.FirmaMerkezi,
                FirmaEmail = firma.FirmaEmail,
                FirmaTelefonNumarasi = firma.FirmaTelefonNumarasi
            };
            return new ApiResult<FirmaGridVM> { Data = firmaVM, Result = true };
        }

    }
}
