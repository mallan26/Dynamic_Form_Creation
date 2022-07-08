import React, { useEffect, useState } from "react";

export default function UserForm() {
  const [fields, setFields] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    role: "",
    gender: ""
  });

  useEffect(() => {
    const fetchUsers = async () => {
      fetch("https://run.mocky.io/v3/a55c4590-c635-49af-a01f-7ee2e6a85669")
        .then((res) => res.json())
        .then((result) => {
          setFields(result);
          setRoles(result[3].data);
          console.log(roles);
        })
        .catch(console.log);
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedOption(e.target);
    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {fields.map((e, i) => {
          // console.log(e, "data here");

          return (
            <div key={i}>
              {e.ui_element_type === "input_text" ? (
                <>
                  <label>{e.name}</label>
                  <input type="text" name="name" onChange={handleChange} />
                </>
              ) : e.ui_element_type === "input_number" ? (
                <>
                  <label>{e.name}</label>
                  <input type="number" name="age" onChange={handleChange} />
                </>
              ) : e.ui_element_type === "input_radio" ? (
                <>
                  <label>{e.name}</label>
                  {" : "}
                  <div>
                    Male{" "}
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={handleChange}
                      checked={selectedOption === "male"}
                    />
                    Female{" "}
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={handleChange}
                      checked={selectedOption === "female"}
                    />
                  </div>
                </>
              ) : e.ui_element_type === "input_dropdown" ? (
                <>
                  <label>{e.name}</label>
                  <select>
                    <option defaultValue> Select </option>
                    {roles.map((x, y) => (
                      <option
                        key={y}
                        value={x.id}
                        name={x.name}
                        onChange={handleChange}
                      >
                        {x.name}
                      </option>
                    ))}{" "}
                  </select>
                </>
              ) : (
                ""
              )}
            </div>
          );
        })}
        <button type="onSubmit"> Submit </button>
      </form>
    </>
  );
}
