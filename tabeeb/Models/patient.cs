//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace tabeeb.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class patient
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public patient()
        {
            this.commentOnAdvices = new HashSet<commentOnAdvice>();
            this.patientViews = new HashSet<patientView>();
            this.reservings = new HashSet<reserving>();
        }
    
        public System.Guid id { get; set; }
        public string mail { get; set; }
        public string password { get; set; }
        public System.DateTime dateOfJoin { get; set; }
        public string phone { get; set; }
        public bool type { get; set; }
        public System.DateTime birthDate { get; set; }
        public string username { get; set; }
        public string providerName { get; set; }
        public string providerID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<commentOnAdvice> commentOnAdvices { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<patientView> patientViews { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<reserving> reservings { get; set; }
    }
}
