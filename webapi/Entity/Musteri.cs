namespace webapi.Entity
{
    public class Musteri : BaseEntity
    {
        public string Adi { get; set; }
        public string Soyadi { get; set; }
        public int FirmaId {get; set;}
        public virtual Firma Firma {get;set;}
        public string TelefonNumarasi { get; set; }
        public string Email { get; set; }
    }
}
