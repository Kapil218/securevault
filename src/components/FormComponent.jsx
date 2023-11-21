import React from "react";
import * as Components from "./component";
import axios from "axios";

function Form() {
  const [signIn, toggle] = React.useState(true);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const url = "http://localhost:3000/api";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    console.log("Form data:", { name, email, password });
    // User.create({ name: "hi", email: "k@gia.om", password: "fdgfdrgrg" });
    // axios.get("http://localhost:3000/api").then((res) => {
    // });
    const res = await axios.post(url + "/create", {
      name,
      email,
      password,
    });
    console.log(res.data);
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    console.log(email, password);

    const res = await axios.post(url + "/get", { email: email, password: password });

    console.log(res.data);
  };
  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form className="signup-form" onSubmit={handleSubmit}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Components.Input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Components.Button>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form onSubmit={handleSignIn}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>Sign In</Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>Sign Up</Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}
export default Form;
