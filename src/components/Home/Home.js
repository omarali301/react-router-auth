import React, { useState } from "react";
import fakedata from "../../fakedata/Fakedata";
import VehicleCard from "../VehicleCard/VehicleCard";
import "./Home.css";

const Home = () => {
  const vehiclesList = fakedata;
  const [vehicles, setVehicles] = useState(vehiclesList);

  return (
    <div className="d-flex justify-content-center align-items-center home-bg">
      <div className="row container">
        {vehicles.map((vehicle) => (
          <VehicleCard vehicle={vehicle} key={vehicle.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
