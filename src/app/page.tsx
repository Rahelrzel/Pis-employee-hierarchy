"use client";
import {
  Button,
  Card,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { error } from "console";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const Login_page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);
  return (
    <>
      <Flex
        justify="center"
        align="center"
        style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}
      >
        <Card shadow="sm" padding="lg" className="border-x-green-600">
          <Flex gap={5} direction={"column"} justify="center" align="center">
            <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction={"column"} gap={"lg"}>
                <TextInput
                  {...register("email")}
                  label="Email"
                  placeholder="Enter your Email"
                  className="mb-4"
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
                <PasswordInput
                  {...register("password")}
                  label="Password"
                  placeholder="Enter your password"
                  className="mb-4"
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
                <Button type="submit" variant="filled" color="teal">
                  Login
                </Button>
              </Flex>
            </form>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};

export default Login_page;
