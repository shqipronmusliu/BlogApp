import router from "next/router";
import { getCsrfToken, signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
    const { data: session, status } = useSession();
    const [authError, setAuthError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};

    if (!values.email) {
        errors.email = "Email-i është i detyrueshëm";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = "Email i pavlefshëm";
    }

    if (!values.password) {
        errors.password = "Fjalëkalimi është i detyrueshëm";
    } else if (values.password.length < 6) {
        errors.password = "Fjalëkalimi duhet të ketë të paktën 6 karaktere";
    }

    return errors;
    };

    const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
    setAuthError("");
    setSuccessMessage("");
    const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
    });

    if (res?.error) {
        setAuthError(res.error);
    } else {
        setSuccessMessage("Kyçja u bë me sukses! Po ridrejtohesh...");
    }

    setSubmitting(false);
    };

    useEffect(() => {
    if (status === "authenticated") {
        if (session?.user?.role === "admin") {
        router.push("/admin");
        } else {
        router.push("/dashboard");
        }
    }
    }, [status, session]);

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 w-full max-w-md mx-auto bg-white px-8 py-10 rounded-xl shadow-lg space-y-5">
          <h2 className="text-black text-2xl font-semibold mb-4">Kyçu</h2>

          {authError && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
              {authError}
            </div>
          )}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Sukses! </strong>
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}

            <Formik
                initialValues={{ email: "", password: "" }}
                validate={validate}
                onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm min-h-[20px] mt-1"
                />

                <Field
                    type="password"
                    name="password"
                    placeholder="Fjalëkalimi"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm min-h-[20px] mt-1"
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
                >
                    {isSubmitting ? "Duke u kyçur..." : "Kyçu"}
                </button>
                </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
    const csrfToken = await getCsrfToken(context);
    return {
        props: {
            csrfToken,
        },
    };
}


SignIn.displayName = "Sign In | My Application";
