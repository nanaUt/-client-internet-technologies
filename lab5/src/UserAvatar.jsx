import React from "react";

export default function UserAvatar(props) {
  const styles = {
    img: {
      width: props.width,
      height: props.height
    }
  };
  return <img src={props.src} alt="usrAvatar" style={styles.img} />;
}
