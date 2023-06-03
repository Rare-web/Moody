import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home() {
  const [search, setSearch] = useState("");
  const [foodCatagory, setFoodCatagory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response);
    setFoodCatagory(response[0]);
    setFoodItems(response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        {/* <Carousel />
         */}
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}>
          <div
            className="carousel-inner"
            style={{
              maxHeight: "500px",
            }}>
            <div className="carousel-caption " style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center" role="search">
                <input
                  className="form-control me-2 bg-white text-black"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit">
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?pizza"
                className="d-block w-100"
                alt="..."
                style={{
                  filter: "brightness(30%)",
                }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100"
                alt="..."
                style={{
                  filter: "brightness(30%)",
                }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                alt="..."
                style={{
                  filter: "brightness(30%)",
                }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev">
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next">
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCatagory !== [] ? (
          foodCatagory.map((data) => {
            return (
              <div className="row m-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItems !== [] ? (
                  foodItems
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase()),
                      // console.log(item);
                    )
                    .map((filteredData) => {
                      // console.log(filteredData);
                      return (
                        <div
                          key={filteredData._id}
                          className="col-12 col-md-6 col-lg-4">
                          <Card
                            Items={filteredData}
                            options={filteredData.options[0]}></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>No such data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>-------</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
