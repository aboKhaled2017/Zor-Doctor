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
    
    public partial class speciality
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public speciality()
        {
            this.subSpecialites = new HashSet<speciality>();
            this.doctors = new HashSet<doctor>();
        }
    
        public string nameAr { get; set; }
        public byte id { get; set; }
        public string nameEng { get; set; }
        public string img { get; set; }
        public string descriptionEng { get; set; }
        public string descriptionAr { get; set; }
        public Nullable<byte> superSpecialityID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<speciality> subSpecialites { get; set; }
        public virtual speciality superSpeciality { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<doctor> doctors { get; set; }
    }
}