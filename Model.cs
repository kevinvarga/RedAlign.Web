using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RedAlign.Portal.Service;

namespace RedAlign.Portal.Service
{
    public class PortalContext : DbContext
    {
        public DbSet<Company> Companies { get; set; }
        public DbSet<Facility> Facilities{ get; set; }
        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<AlignmentSystem> AlignmentSystems { get; set; }
        public DbSet<AlignmentResult> AlignmentResults { get; set; }

        private IConfiguration Configuration { get; set; }

        public PortalContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Facility>()
                .HasOne(f => f.Company)
                .WithMany(c => c.Facilities)
                .HasForeignKey(f => f.CompanyId);

            modelBuilder.Entity<Equipment>()
                .HasOne(e => e.Facility)
                .WithMany(f => f.Equipment)
                .HasForeignKey(f => f.FacilityId);

            modelBuilder.Entity<AlignmentResult>()
                .HasOne(a => a.Equipment)
                .WithMany(e => e.AlignmentResults)
                .HasForeignKey(a => a.EquipmentId);

            modelBuilder.Entity<AlignmentResult>()
                .HasOne(a => a.AlignmentSystem)
                .WithMany(s => s.AlignmentResults)
                .HasForeignKey(a => a.AlignmentSystemId);

            modelBuilder.Entity<AlignmentSystem>()
                .HasOne(a => a.Company)
                .WithMany(c => c.AlignmentSystems)
                .HasForeignKey(a => a.CompanyId);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite(Configuration.GetConnectionString("Portal"));
    }

    public class Company
    {
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public bool IsArchived { get; set; } = false;
        public DateTime UpdateDate { get; set; }

        [JsonIgnore]
        public List<Facility> Facilities { get; set; }

        [JsonIgnore]
        public List<AlignmentSystem> AlignmentSystems { get; set; }
    }

    public class Facility
    {
        public int FacilityId { get; set; }
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public bool IsArchived { get; set; }
        public DateTime UpdateDate { get; set; }

        [JsonIgnore]
        public Company Company { get; set; }

        [JsonIgnore]
        public List<Equipment> Equipment { get; set; }
    }

    public class Equipment
    {
        public int EquipmentId { get; set; }
        public int FacilityId { get; set; }
        public string Name { get; set; }
        public int EquipmentType { get; set; }
        public string Motor { get; set; }
        public bool IsArchived { get; set; }
        public DateTime UpdateDate { get; set; }

        [JsonIgnore]
        public Facility Facility { get; set; }

        [JsonIgnore]
        public List<AlignmentResult> AlignmentResults { get; set; }
    }

    public class AlignmentSystem
    {
        public int AlignmentSystemId { get; set; }
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string Make { get; set; }
        public string SerialNumber { get; set; }
        public string UniqueId { get; set; }
        public bool IsArchived { get; set; }
        public DateTime UpdateDate { get; set; }

        [JsonIgnore]
        public Company Company { get; set; }

        [JsonIgnore]
        public List<AlignmentResult> AlignmentResults { get; set; }
    }

    public class AlignmentResult
    {
        public int AlignmentResultId { get; set; }
        public int EquipmentId { get; set; }
        public int AlignmentSystemId { get; set; }
        public string MeasurementId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime InsertDate { get; set; }

        [JsonIgnore]
        public Equipment Equipment { get; set; }

        [JsonIgnore]
        public AlignmentSystem AlignmentSystem { get; set; }
    }
}
