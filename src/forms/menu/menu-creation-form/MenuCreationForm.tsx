import React, { useCallback } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import { useMenuStore } from "../../../stores/menu";
import { Button, TextInput } from "../../../components/ui";
import { makeStyles } from "../../../hooks";

type FormValues = {
  title: string;
  description: string;
};

const ValidationSchema = object().shape({
  title: string()
    .max(20, "Title should be at most 20 characters long.")
    .required("Title is required."),
  description: string().max(280),
});

const initialValues: FormValues = { title: "", description: "" };

type Props = {
  onPress: () => void;
};

const MenuCreationForm = ({ onPress }: Props) => {
  const status = useMenuStore((state) => state.status);
  const createMenu = useMenuStore((state) => state.createMenu);
  const styles = useStyles();

  const handleOnSubmit = useCallback(
    async (values: FormValues) => {
      const menu: Omit<Menu, "id" | "categories"> = {
        title: values.title,
        description: values.description,
      };
      try {
        await createMenu(menu);
      } catch (error) {
        console.log(`error`);
        console.log(error);
      }
      onPress();
    },
    [createMenu]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
        <React.Fragment>
          <TextInput
            label="Title"
            value={values.title}
            error={errors.title}
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            containerStyle={styles.field}
          />
          <TextInput
            label="Description"
            value={values.description}
            error={errors.description}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            containerStyle={styles.field}
          />
          <Button
            label="Create"
            loading={status === "loading"}
            onPress={handleSubmit}
            containerStyle={styles.submit}
          />
        </React.Fragment>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(() => ({
  field: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  submit: {
    margin: 16,
  },
}));

export default MenuCreationForm;
