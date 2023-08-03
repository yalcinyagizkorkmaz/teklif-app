using System.ComponentModel.DataAnnotations;

namespace webapi.ViewModel.Musteri
{
    public class MusteriCreateVM
        
    {
        public int Id { get; set; }
        [Required]
        public required string Adi { get; set; }
        [Required]
        public required string Soyadi { get; set; }
        [Required]
        public required  int FirmaId {get;set;}
        [Required]
        
        public required string TelefonNumarasi { get; set; }
        [Required]
        public required string Email { get; set; }
    }
}
