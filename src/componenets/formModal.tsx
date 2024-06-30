import React from "react";
import { Modal, TextInput, Button, Group, Flex } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FormSchemaType) => void;
}

const FormModal = ({ isOpen, onClose, onSubmit }: FormModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit: SubmitHandler<FormSchemaType> = (values) => {
    onSubmit(values);
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Add New Stuff">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Flex direction={"column"} gap={"md"}>
          <TextInput
            label="Name"
            placeholder="Enter name"
            {...register("name")}
            error={errors.name?.message}
          />
          <TextInput
            label="Description"
            placeholder="Enter description"
            {...register("description")}
            error={errors.description?.message}
          />
          <Group>
            <Button color="green" type="submit">
              Submit
            </Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  );
};

export default FormModal;
