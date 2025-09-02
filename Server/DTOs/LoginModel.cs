using System.ComponentModel.DataAnnotations;

namespace FitnessTracker.Server.DTOs
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email alanı zorunludur")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Şifre alanı zorunludur")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}