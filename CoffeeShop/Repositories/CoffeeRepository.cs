using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using CoffeeShop.Models;
using Microsoft.VisualBasic;

namespace CoffeeShop.Repositories
{
    public class CoffeeRepository : ICoffeeRepository
    {
        private readonly string _connectionString;

        public CoffeeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Coffee> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT C.Id, C.Title, C.BeanVarietyId,
                                        BV.[Name], BV.Region, BV.Notes
                                        FROM Coffee C
                                        JOIN BeanVariety BV
                                        ON BV.Id = C.BeanVarietyId";

                    var reader = cmd.ExecuteReader();

                    var coffeeList = new List<Coffee>();
                    while (reader.Read())
                    {
                        var variety = new BeanVariety()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("BeanVarietyId")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Region = reader.GetString(reader.GetOrdinal("Region"))

                        };

                        if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
                        {
                            variety.Notes = reader.GetString(reader.GetOrdinal("Notes"));
                        }

                        var coffee = new Coffee()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            BeanVariety = variety
                        };

                        coffeeList.Add(coffee);
                    }

                    reader.Close();

                    return coffeeList;
                }
            }
        }


        public Coffee Get(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT C.Id, C.Title, C.BeanVarietyId,
                                        BV.[Name], BV.Region, BV.Notes
                                        FROM Coffee C
                                        JOIN BeanVariety BV
                                        ON BV.Id = C.BeanVarietyId
                                        WHERE C.Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Coffee coffee = null;
                    if (reader.Read())
                    {
                        var variety = new BeanVariety()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("BeanVarietyId")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Region = reader.GetString(reader.GetOrdinal("Region"))

                        };

                        if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
                        {
                            variety.Notes = reader.GetString(reader.GetOrdinal("Notes"));
                        }

                        coffee = new Coffee()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            BeanVariety = variety
                        };
                    }

                    reader.Close();

                    return coffee;

                }
            }
        }
        public void Add(Coffee coffee)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Coffee (Title, BeanVarietyId)
                    OUTPUT INSERTED.Id
                    VALUES (@Title, @BeanVarietyId)";
                    cmd.Parameters.AddWithValue("@Title", coffee.Title);
                    cmd.Parameters.AddWithValue("@BeanVarietyId", coffee.BeanVariety.Id);
                    coffee.Id = (int)cmd.ExecuteScalar();
                }

            }
        }

        public void Update(Coffee coffee)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Coffee
                    SET Title = @Title,
                    BeanVarietyId = @BeanVarietyId
                    WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", coffee.Id);
                    cmd.Parameters.AddWithValue("@Title", coffee.Title);
                    cmd.Parameters.AddWithValue("@BeanVarietyId", coffee.BeanVariety.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE
                    FROM Coffee
                    WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
