using System.ComponentModel.DataAnnotations;

namespace webapi.ViewModel.Firma
{
    public class FirmaCreateVM
        
    {
        public int Id { get; set; }
        [Required]
        public required string FirmaAdi { get; set; }
        [Required]
        public required string FirmaFaaliyetAlani { get; set; }
        [Required]
        public required string FirmaMerkezi{get;set;}
        [Required]
        
        public required string FirmaTelefonNumarasi { get; set; }
        [Required]
        public required string FirmaEmail { get; set; }
    }
}
