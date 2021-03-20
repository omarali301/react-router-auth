import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";

const VehicleCard = (props) => {
  const { name, img } = props.vehicle;
  const history = useHistory();

  const proceedToDestination = (name) => {
    history.push(`/destination/${name}`);
  };

  return (
    <div
      onClick={() => {
        proceedToDestination(props.vehicle.name);
      }}
      className="col-md-3 text-center mt-3"
    >
      <Card style={{ width: "15rem" }}>
        <Card.Img
          variant="top"
          className="card-img-top py-1 mt-3"
          src={img}
          alt="..."
        />
        <h1>{name}</h1>
      </Card>
    </div>
  );
};

export default VehicleCard;
