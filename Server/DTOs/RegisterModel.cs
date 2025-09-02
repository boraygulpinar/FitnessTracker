using System.ComponentModel.DataAnnotations;

namespace FitnessTracker.Server.DTOs
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Email alanı zorunludur")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Şifre alanı zorunludur")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Şifreler uyuşmuyor")]
        public string ConfirmPassword { get; set; }
    }
}