import {
  FormInput,
  FormSubmit,
  FormFileUpload,
  FormError,
  FormTextArea,
} from "@/components/FormComponents";
import NextLink from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { initialize } from "esbuild";

export default function AppPortal() {

  const { user } = useAuth();

  let formNumbers = [];
  const [answers, setAnswers] = useState({});

  function allQuestionsAnswered() {
    for (const answer in answers) {
      if (!answer) {
        return false
      }
    }
    return true
  }

  function setAnswer(answer: string, category: string, value: string) {
    answers[category[answer]] = value;
    setAnswers(answers);
  }

  const [PDF, setPDF] = useState();

  const Question = ({
    question,
    placeholder,
    desc,
    type = "input",
    category,
    answer,
  }: {
    question: string;
    placeholder?: string;
    desc?: string;
    type?: string; // Should be "input" or "textarea"
    category: string;
    answer: string;
  }) => {
    if (!answers[category]) {
      answers[category] = [];
      setAnswers(answers);
    }
    if (formNumbers[category] === undefined) {
      formNumbers[category] = 0;
    }
    answers[category[answer]] = "";
    formNumbers[category]++;
    return (
      <div className="space-y-2">
        <p>
          <span className="mr-1.5">
            <em>{formNumbers[category]}.</em>
          </span>
          {question}
        </p>
        {type === "input" && (
          <FormInput
            autoComplete={false}
            placeholder={placeholder}
            desc={desc}
            onChange={(event) => {
              setAnswer(answer, category, event.target.value);
            }}
          />
        )}
        {type === "textarea" && (
          <FormTextArea
            autoComplete={false}
            placeholder={placeholder}
            desc={desc}
            onChange={(event) => {
              setAnswer(answer, category, event.target.value);

            }}
          />
        )}
      </div>
    );
  }

  const [error, setError] = useState("");

  async function Submit() {
    if (!allQuestionsAnswered) {
      setError("You must answer every question.")
      return;
    }

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("answers", JSON.stringify(answers))
    formData.append("PDF", PDF);

    const res = await fetch("/api/app", {
      method: "POST",
      body: formData
    })

    console.log(JSON.stringify(answers))

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
          category="background"
          answer="discover"
        />
        <Question
          question="If you are comfortable sharing, what state are you from? (Applicants outside the US should answer with their country.)"
          placeholder="State or Country"
          desc={`If you are not comfortable sharing this information, please input "Prefer not to answer."`}
          category="background"
          answer="location"
        />
        <Question
          type="textarea"
          question="What got you interested in mathematics?"
          placeholder="A short paragraph..."
          category="background"
          answer="interest"
        />
        <Question
          type="textarea"
          question="What do you hope to gain from MAST?"
          placeholder="A short paragraph..."
          category="background"
          answer="gain"
        />
      </div>
      <h2>Contest Results</h2>
      <p>As a general rule of thumb, you do not need to include results if they aren't important enough for you to remember. For instance, if you're in high school and had unremarkable MATHCOUNTS scores, you do not need to include them.</p>
      <p>This does not mean you should omit important scores (AMCs and AIME) just because you don't like them.</p>
      <p>If you did not qualify for or take a contest (mostly international students), put "N/A".</p>
      <div className="space-y-4">
        <Question
          question="Most recent AMC scores (A/B)"
          placeholder="Indicate the year and version for each score..."
          category="contest"
          answer="amc"
        />
        <Question
          question="Most recent AIME score (indicate I/II)"
          placeholder="Indicate the year and version for your score..."
          category="contest"
          answer="aime"
        />
        <Question
          question="Most recent USA(J)MO score, if applicable"
          placeholder={`Put "did not qualify" if you have never qualified...`}
          category="contest"
          answer="oly"
        />
        <Question
          question="Other notable results"
          placeholder="A list..."
          desc="This is where international students should list contest results from their country."
          type="textarea"
          category="contest"
          answer="other"
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
        a PDF file under 2MB is by using <NextLink href="/resources/latex"><a className="blue-link">LaTeX</a></NextLink> to
        typeset your solutions.
      </p>
      <p>
        We will not grade papers that we cannot read. So please, make sure your
        LaTeX is typeset well, or, if you are handwriting, <em>be very neat</em>
        .
      </p>
      <FormFileUpload text="PDF File" accept="application/pdf" onChange={(event) => {
        setPDF(event.target.files[0])
      }} />
      <div className="grid grid-cols-2 pt-2 gap-x-16">
        <FormSubmit text="Save" />
        <FormSubmit text="Submit" onClick={() => {
          Submit();
        }} />
      </div>
      <FormError error={error} />
    </>
  );
}
