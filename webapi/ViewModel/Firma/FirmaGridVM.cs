using System.ComponentModel.DataAnnotations;

namespace webapi.ViewModel.Firma

{

    public class FirmaGridVM
    {
        public int Id { get; set; }
        
        public  string FirmaAdi { get; set; }
       
        public  string FirmaFaaliyetAlani { get; set; }
        
        public string FirmaMerkezi { get; set; }
        

        public  string FirmaTelefonNumarasi { get; set; }
      
        public  string FirmaEmail { get; set; }
    }
}
