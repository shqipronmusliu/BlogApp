import { useRouter } from "next/router";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useFetch from "hooks/useFetch";
import { User } from "@/api/models/User";

export default function SignUp() {
    const router = useRouter();
    const { post } = useFetch<User[]>("/api/auth/register");
    const [error, setError] = useState("");

    const initialValues = {
        name: "",
        email: "",
        password: "",
        role: "user"
    };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};

    if (!values.name) {
        errors.name = "Emri është i detyrueshëm";
    } else if (values.name.length < 2) {
        errors.name = "Emri duhet të ketë të paktën 2 karaktere";
    }

    if (!values.email) {
        errors.email = "Email-i është i detyrueshëm";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email i pavlefshëm";
    }

    if (!values.password) {
        errors.password = "Fjalëkalimi është i detyrueshëm";
    } else if (values.password.length < 6) {
        errors.password = "Fjalëkalimi duhet të ketë të paktën 6 karaktere";
    }

    if (!["user", "admin"].includes(values.role)) {
        errors.role = "Roli është i pavlefshëm";
    }

    return errors;
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
    setError("");
    const res = await post(values);
    if (res?.error) {
        setError(res.error);
    } else {
        router.push("/sign-in");
    }
    setSubmitting(false);
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 max-w-md w-full bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Regjistrohu
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
              {error}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                {/* Name */}
                <div>
                    <Field
                    type="text"
                    name="name"
                    placeholder="Emri"
                    className="w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-400 text-black"
                    />
                    <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm min-h-[20px] mt-1 transition-all duration-200"
                    />
                </div>

                {/* Email */}
                <div>
                    <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-400 text-black"
                    />
                    <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm min-h-[20px] mt-1 transition-all duration-200"
                    />
                </div>

                {/* Password */}
                <div>
                    <Field
                    type="password"
                    name="password"
                    placeholder="Fjalëkalimi"
                    className="w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-400 text-black"
                    />
                    <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm min-h-[20px] mt-1 transition-all duration-200"
                    />
                </div>

                {/* Role */}
                <div>
                    <Field
                    as="select"
                    name="role"
                    className="w-full px-4 py-2 border border-gray-300 rounded text-black bg-gray-50"
                    >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    </Field>
                    <ErrorMessage
                    name="role"
                    component="div"
                    className="text-red-500 text-sm min-h-[20px] mt-1 transition-all duration-200"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
                >
                    {isSubmitting ? "Duke u regjistruar..." : "Regjistrohu"}
                </button>
                </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

SignUp.displayName = "SignUp | My Application";
