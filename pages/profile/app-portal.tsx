import {
  FormInput,
  FormSubmit,
  FormFileUpload,
  FormError,
  FormTextArea,
} from "@/components/FormComponents";

import { useAuth } from "@/contexts/AuthProvider";
import {
  bgQuestions,
  contestQuestions,
} from "@/utils/applications/Season4Questions";

import NextLink from "next/link";
import { useState } from "react";
import _ from "lodash";

const QuestionComponent = ({
  question,
  number,
  placeholder,
  desc,
  type = "input",
  onChange = function (event) {},
}: {
  question: string;
  number;
  placeholder?: string;
  desc?: string;
  type?: string; // Should be "input" or "textarea"
  onChange?;
}) => {
  return (
    <div className="space-y-2">
      <p>
        <span className="mr-1.5">
          <em>{number}.</em>
        </span>
        {question}
      </p>
      {type === "input" && (
        <FormInput
          placeholder={placeholder}
          desc={desc}
          onChange={(event) => {
            onChange(event);
          }}
        />
      )}
      {type === "textarea" && (
        <FormTextArea
          placeholder={placeholder}
          desc={desc}
          onChange={(event) => {
            onChange(event);
          }}
        />
      )}
    </div>
  );
};

export default function AppPortal() {
  const { user } = useAuth();

  const [answers, setAnswers] = useState({});

  function allQuestionsAnswered() {
    let answered = true;
    bgQuestions.forEach((question) => {
      if (
        !answers[question.category] ||
        !answers[question.category][question.answer]
      ) {
        answered = false;
      }
    });
    contestQuestions.forEach((question) => {
      if (
        !answers[question.category] ||
        !answers[question.category][question.answer]
      ) {
        answered = false;
      }
    });
    return answered;
  }

  function setAnswer(answer: string, category: string, value: string) {
    _.set(answers, [category, answer], value);
    setAnswers(answers);
  }

  const [PDF, setPDF] = useState();

  const [error, setError] = useState("");

  async function Submit() {
    if (!allQuestionsAnswered()) {
      setError("You must answer every question.");
      return;
    }
    if (!PDF) {
      setError("You must upload a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("answers", JSON.stringify(answers));
    formData.append("PDF", PDF);

    const res = await fetch("/api/app/upload", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      setError("");
      return;
    } else {
      setError(await res.text());
      return;
    }
  }

  return (
    <>
      <h1>Application Portal</h1>
      <p>
        Clicking the "Save" button will save your responses to your{" "}
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
        {bgQuestions.map((question, index) => {
          return (
            <QuestionComponent
              question={question.question}
              placeholder={question.placeholder}
              onChange={(event) => {
                setAnswer(
                  question.answer,
                  question.category,
                  event.target.value
                );
              }}
              number={index + 1}
              type={question.type}
              desc={question.desc}
              key={index}
            />
          );
        })}
      </div>
      <h2>Contest Results</h2>
      <p>
        As a general rule of thumb, you do not need to include results if they
        aren't important enough for you to remember. For instance, if you're in
        high school and had unremarkable MATHCOUNTS scores, you do not need to
        include them.
      </p>
      <p>
        This does not mean you should omit important scores (AMCs and AIME) just
        because you don't like them.
      </p>
      <p>
        If you did not qualify for or take a contest (mostly international
        students), put "N/A".
      </p>
      <div className="space-y-4">
        {contestQuestions.map((question, index) => {
          return (
            <QuestionComponent
              question={question.question}
              placeholder={question.placeholder}
              onChange={(event) => {
                setAnswer(
                  question.answer,
                  question.category,
                  event.target.value
                );
              }}
              number={index + 1}
              type={question.type}
              desc={question.desc}
              key={index}
            />
          );
        })}
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
        Please have your full name (first and last) appear in the contents of
        the PDF file. It's no big deal if you forget, but this makes it more
        convenient for me when I'm going through applications. (The filename
        doesn't matter, we rename them through our server anyways.)
      </p>
      <p>
        There is a filesize limit of 512KB. By design, it is nearly impossible
        to get a PDF under 512KB without using{" "}
        <NextLink href="/resources/latex">
          <a className="blue-link">LaTeX</a>
        </NextLink>{" "}
        to typeset your solutions.
      </p>
      <p>
        We will not grade papers that we cannot read. So please, make sure your
        LaTeX is typeset well.
      </p>
      <FormFileUpload
        text="PDF File"
        accept="application/pdf"
        onChange={(event) => {
          setPDF(event.target.files[0]);
        }}
      />
      <div className="grid grid-cols-2 pt-2 gap-x-16">
        <FormSubmit text="Save" />
        <FormSubmit
          text="Submit"
          onClick={() => {
            Submit();
          }}
        />
      </div>
      <FormError error={error} />
    </>
  );
}
