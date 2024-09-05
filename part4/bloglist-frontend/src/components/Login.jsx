const LoginForm = ({ handleLogin, handleLoginFormChange, values }) => {
  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          onChange={handleLoginFormChange}
          value={values.username}
          placeholder="username"
        />
        <br />
        <input
          type="password"
          name="password"
          onChange={handleLoginFormChange}
          value={values.password}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export { LoginForm };
