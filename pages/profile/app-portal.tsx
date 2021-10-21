import {
  FormInput,
  FormSubmit,
  FormFileUpload,
  FormError,
  FormTextArea,
} from "@/components/FormComponents";
import NextLink from "next/link";
import { useState } from "react";

export default function AppPortal() {
  let formNumber = 1;

  function Question({
    question,
    placeholder,
    desc,
    type = "input",
  }: {
    question: string;
    placeholder?: string;
    desc?: string;
    type?: string; // Should be "input" or "textarea"
  }) {
    const currentFormNumber = formNumber;
    formNumber++;
    return (
      <div className="space-y-2">
        <p>
          <span className="mr-1.5">
            <em>{currentFormNumber}.</em>
          </span>
          {question}
        </p>
        {type === "input" && (
          <FormInput
            autoComplete={false}
            placeholder={placeholder}
            desc={desc}
          />
        )}
        {type === "textarea" && (
          <FormTextArea
            autoComplete={false}
            placeholder={placeholder}
            desc={desc}
          />
        )}
      </div>
    );
  }

  const [error, setError] = useState("");
  return (
    <>
      <h1>Application Portal</h1>
      <p>
        Clicking the "Save" button will save your responses, except for the
        uploaded PDF, to your{" "}
        <NextLink href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">
          <a className="blue-link">local storage</a>
        </NextLink>
        .
      </p>
      <p>
        This means that, as you're working on the application, you should not
        clear your local storage for the website. Also, it means that you cannot
        transfer your responses between devices.
      </p>
      <p>
        Once you are finished, click the "Submit" button to send your responses
        to the MAST website.
      </p>
      <h2>Background</h2>
      <p>
        Your answers to these questions will help us learn more about the
        program's reach. They will <em>not</em> be used for decisions.
      </p>
      <div className="space-y-4">
        <Question
          question="How did you find out about the
        program?"
          placeholder="Around 1 sentence..."
        />
        <Question
          question="If you are comfortable sharing, what state are you from? (Applicants outside the US should answer with their country.)"
          placeholder="State or Country"
          desc={`If you are not comfortable sharing this information, please input "Prefer not to answer."`}
        />
        <Question
          type="textarea"
          question="What got you interested in mathematics?"
          placeholder="A short paragraph..."
        />
        <Question
          type="textarea"
          question="What do you hope to gain from MAST?"
          placeholder="A short paragraph..."
        />
      </div>
      <h2>Problems</h2>
      <p>
        Upload a PDF of your solutions to{" "}
        <NextLink href="/diagnostic/season4.pdf">
          <a className="blue-link">this year's diagnostic problems</a>
        </NextLink>
        .
      </p>
      <p>
        Please have your full name (first and last) appear in the contents of the PDF file. It's no big deal if you forget, but this makes it more convenient for me when I'm going through applications.
      </p>
      <p>
        There is a filesize limit of 2MB. In practice, the only way you can get
        a PDF file under 2MB is by using <a href="/resources/latex">LaTeX</a> to
        typeset your solutions.
      </p>
      <p>
        We will not grade papers that we cannot read. So please, make sure your
        LaTeX is typeset well, or, if you are handwriting, <em>be very neat</em>
        .
      </p>
      <FormFileUpload text="PDF File" accept="application/pdf" />
      <div className="grid grid-cols-2 pt-2 gap-x-16">
        <FormSubmit text="Save" />
        <FormSubmit text="Submit" />
      </div>
      <FormError error={error} />
    </>
  );
}
