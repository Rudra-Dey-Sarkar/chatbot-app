"use client"
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';

type CompanyDataType = [{
  userId: string,
  name: string,
  title: string,
  description: string,
  url: string,
  logo: string,
  image: string,
}]

type PromptDataType = {
  inputs: {
    question: string,
    context: string,
  }
}

async function Query(data: PromptDataType, visit: CompanyDataType[0] | undefined, answers: any[] | [string], setQuestions: React.Dispatch<React.SetStateAction<any[] | [string]>>, questions: any[] | [string], setAnswers: React.Dispatch<React.SetStateAction<any[] | [string]>>) {
  setQuestions((questions) => [...questions, data.inputs.question]);
  const context = `${visit?.name} and ${visit?.title} and ${visit?.description}`;
  const query: PromptDataType = {
    "inputs": {
      "question": data.inputs.question,
      "context": context
    }
  };

  const response = await fetch(
    "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GF_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(query),
    }
  );
  const result = await response.json();
  setAnswers((answers) => [...answers, result.answer]);
}

function ViewChatbot() {
  const router = useRouter()
  const [visit, setVisit] = useState<CompanyDataType[0] | undefined>(undefined);
  const [chatbot, setChatbot] = useState<boolean>(false);
  const [questions, setQuestions] = useState<[string] | any[]>([]);
  const [answers, setAnswers] = useState<[string] | any[]>([]);

  useEffect(() => {
    const cookies = getCookie("visit");
    if (cookies !== undefined && typeof cookies === "string") {
      const userCookies = JSON.parse(cookies)
      setVisit(userCookies);
    } else {
      console.log("No User Details Available");
    }
  }, []);

  const form = useForm<PromptDataType>({
    defaultValues: {
      inputs: {
        question: "",
        context: "",
      }
    }
  });
  const { register, handleSubmit, formState: { errors } } = form;
  return (
    <div className='w-full h-fit relative'>
      <div className='flex justify-between bg-gray-200 px-3'>
        <button className='font-semibold underline'
        onClick={()=>router.push("/dashboard")}> Back To Dashboard</button>
        <p 
        className='text-center font-semibold text-[1.2rem]'>
          Chatbot not working as intended ? 
          <button 
          className='underline text-blue-600'
          onClick={()=>toast.success("Feedback Shared To Platform")}>Share feedback</button></p>
        <div></div>
      </div>

      <iframe
        src={typeof visit?.url === "string" ? visit?.url : "#"}
        className="w-full h-[100vh]"
      ></iframe>

      <div className={`absolute w-fit h-fit ${chatbot === false ? "top-[77%]" : "top-[36%]"} right-10 text-white`}>
        <div className='relative'>

          {chatbot === true &&
            <div className='absolute top-0 right-0 z-10 bg-green-100 border-2 border-gray-500'>
              <div className='flex justify-end px-2 py-3'>
                <button
                  onClick={() => setChatbot(false)}
                  className='font-semibold text-red-500'>Close</button>
              </div>

              <div className='w-full h-[36vh] text-black overflow-y-auto px-3'>
                {questions?.map((question: string, index: number) => (
                  <div key={index} className="mb-2">
                    <p className='px-2 text-end bg-gray-200 rounded-lg p-2 inline-block'>{question}</p>
                    {answers?.[index] && (
                      <p className='px-2 text-start bg-blue-200 rounded-lg p-2 inline-block mt-1'>{answers[index]}</p>
                    )}
                  </div>
                ))}
              </div>
              <form
                className='border-2 border-gray-500 bg-gray-500 p-1'
                onSubmit={handleSubmit((data) => Query(data, visit, questions, setQuestions, answers, setAnswers))}>
                <input
                  type="text" {...register("inputs.question")}
                  placeholder='Ask questions to Chatbot'
                  className='text-black p-1 px-5' />
                <button type='submit' className='w-full font-semibold bg-gray-500 p-1'>Ask Chatbot</button>
              </form>
            </div>
          }

          {chatbot === false &&
            <button
              onClick={() => setChatbot(true)}
              className='absolute top-[77%] right-10 text-white z-50'>
              <svg
                width="70px"
                height="70px"
                viewBox="-14 0 284 284"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid"
                fill="#000000">
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                    <ellipse
                      fill="#95eaa6"
                      cx={127.748451}
                      cy={156.0842}
                      rx={127.748451}
                      ry={127.477662}
                    />
                    <path
                      d="M84.7773328,276.161153 C98.2069248,280.948494 112.671134,283.561862 127.748451,283.561862 C142.521768,283.561862 156.707525,281.050679 169.907202,276.447269 L167.613161,238.360568 L86.9947355,238.360568 L84.7773328,276.161153 L84.7773328,276.161153 Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M214.863253,128.898026 C198.886713,127.873627 204.271834,141.198479 203.247435,157.141809 C202.220481,173.085139 195.169754,185.612953 211.148848,186.634797 C227.125387,187.659196 230.949641,174.924459 231.976594,158.981129 C232.998439,143.040354 230.839792,129.922425 214.863253,128.898026 L214.863253,128.898026 Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M169.357961,268.129454 L167.610606,238.360568 L86.9947355,238.360568 L86.0801846,253.943698 C99.2083324,270.528235 162.069654,275.200619 169.357961,268.129454 L169.357961,268.129454 Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M39.7446436,128.898026 C55.7211831,127.873627 50.3360624,141.198479 51.3604615,157.141809 C52.3874153,173.085139 59.4381427,185.612953 43.4590486,186.634797 C27.4825091,187.659196 23.6582559,174.924459 22.6313021,158.981129 C21.6043483,143.0378 23.7655495,129.922425 39.7446436,128.898026 L39.7446436,128.898026 Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M127.303948,16.5870916 L127.303948,16.5870916 L127.303948,16.5870916 L127.303948,16.5870916 L127.303948,16.5870916 C77.9820666,16.5870916 37.9998441,56.4850119 37.9998441,105.702155 L37.9998441,212.622859 C37.9998441,224.394508 52.6837502,256.02826 127.303948,256.02826 C201.924146,256.02826 216.608052,224.397062 216.608052,212.622859 L216.608052,105.702155 C216.608052,56.4850119 176.62583,16.5870916 127.303948,16.5870916 L127.303948,16.5870916 Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M127.303948,256.02826 C201.924146,256.02826 216.608052,224.397062 216.608052,212.622859 L216.608052,105.702155 C216.608052,56.4850119 176.62583,16.5870916 127.303948,16.5870916 L127.303948,256.02826 L127.303948,256.02826 Z"
                      fill="#D4D4D4"
                    />
                    <path
                      d="M49.7868209,87.6870352 C48.9897822,90.6606028 48.3587932,93.7031449 47.906627,96.8044431"
                      stroke="#FFFFFF"
                      strokeWidth={3.238}
                    />
                    <path
                      d="M88.4304271,38.3753719 C74.8143485,45.9140301 63.6277053,57.2897145 56.3368445,71.0411875"
                      stroke="#FFFFFF"
                      strokeWidth={3.238}
                    />
                    <path
                      d="M207.237738,113.491165 C195.126325,112.556177 176.59262,112.178094 153.790159,116.285909 C145.068716,117.856995 138.815027,123.804131 127.303948,123.804131 C115.790315,123.804131 109.539181,117.856995 100.817738,116.285909 C78.0127219,112.178094 59.4815711,112.556177 47.367604,113.491165 C37.0623017,114.285649 22.112716,116.329338 22.6313021,121.768105 C22.927637,124.88984 23.2341904,125.564258 23.8370787,128.634901 C24.4323031,131.679998 28.9437468,131.294251 30.4892867,134.896253 C32.149784,138.763935 36.7761852,155.414892 37.9589703,159.17528 C40.3398681,166.739484 45.2728226,172.41583 52.8932283,175.026643 C63.6915706,178.728275 74.6917271,178.649082 85.8528242,177.103542 C94.0020345,175.974404 100.687452,171.940673 106.072573,165.722749 C110.341329,160.794903 113.378762,155.167094 115.836298,149.18164 C117.054847,146.210627 118.09202,143.111883 119.73208,140.386113 C120.702832,138.774153 122.567699,136.901623 124.248633,136.653826 C125.377771,136.487776 126.384288,136.357491 127.301394,136.293626 C128.215944,136.357491 129.225016,136.487776 130.354154,136.653826 C132.037643,136.899069 133.899955,138.771599 134.870707,140.386113 C136.513322,143.114438 137.54794,146.210627 138.766489,149.18164 C141.224026,155.167094 144.261458,160.794903 148.530214,165.722749 C153.915335,171.940673 160.603307,175.974404 168.749963,177.103542 C179.91106,178.651637 190.911217,178.728275 201.709559,175.026643 C209.329965,172.41583 214.262919,166.739484 216.643817,159.17528 C217.829157,155.412337 222.453003,138.763935 224.116055,134.896253 C225.661595,131.296806 230.170484,131.682552 230.768263,128.634901 C231.368597,125.564258 231.672596,124.88984 231.971485,121.768105 C232.49518,116.331892 217.545595,114.288203 207.237738,113.491165 L207.237738,113.491165 Z M108.037069,139.729578 C107.546584,150.177938 103.52818,159.101196 95.5399105,166.016529 C91.0259122,169.925084 84.2383098,171.475733 70.3054594,171.475733 C56.2040047,171.475733 48.3690116,165.520934 46.5475737,161.584278 C42.1536422,152.081124 40.4573802,141.793704 42.161306,131.312133 C43.2214697,124.800429 43.9597524,121.300612 65.627966,121.300612 C89.6362036,121.300612 99.1827863,125.753299 102.107816,127.163445 C106.764873,129.408948 108.274648,134.648456 108.037069,139.729578 L108.037069,139.729578 Z M208.055214,161.584278 C206.233776,165.520934 198.398783,171.475733 184.297328,171.475733 C170.367032,171.475733 163.576875,169.925084 159.062877,166.016529 C151.077162,159.101196 147.058758,150.177938 146.568273,139.729578 C146.328139,134.651011 147.840469,129.408948 152.494971,127.165999 C155.420001,125.755854 164.966584,121.303166 188.974821,121.303166 C210.64048,121.303166 211.378763,124.800429 212.441481,131.314688 C214.145407,141.793704 212.449145,152.081124 208.055214,161.584278 L208.055214,161.584278 Z"
                      fill="#333333"
                    />
                    <path
                      d="M108.037069,139.729578 C107.546584,150.177938 103.52818,159.101196 95.5399105,166.016529 C91.0259122,169.925084 84.2383098,171.475733 70.3054594,171.475733 C56.2040047,171.475733 48.3690116,165.520934 46.5475737,161.584278 C42.1536422,152.081124 40.4573802,141.793704 42.161306,131.312133 C43.2214697,124.800429 43.9597524,121.300612 65.627966,121.300612 C89.6362036,121.300612 99.1827863,125.753299 102.107816,127.163445 C106.764873,129.408948 108.274648,134.648456 108.037069,139.729578 L108.037069,139.729578 Z M208.055214,161.584278 C206.233776,165.520934 198.398783,171.475733 184.297328,171.475733 C170.367032,171.475733 163.576875,169.925084 159.062877,166.016529 C151.077162,159.101196 147.058758,150.177938 146.568273,139.729578 C146.328139,134.651011 147.840469,129.408948 152.494971,127.165999 C155.420001,125.755854 164.966584,121.303166 188.974821,121.303166 C210.64048,121.303166 211.378763,124.800429 212.441481,131.314688 C214.145407,141.793704 212.449145,152.081124 208.055214,161.584278 L208.055214,161.584278 Z"
                      opacity={0.5}
                      fill="#FFFFFF"
                    />
                    <path
                      d="M136.569524,141.448831 C136.569524,143.127211 135.207916,144.486264 133.526982,144.486264 L121.967365,144.486264 C120.286431,144.486264 118.924823,143.127211 118.924823,141.448831 L118.924823,121.701686 C118.924823,120.023306 120.286431,118.664253 121.967365,118.664253 L133.526982,118.664253 C135.207916,118.664253 136.569524,120.023306 136.569524,121.701686 L136.569524,141.448831 L136.569524,141.448831 Z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M190.844797,202.9511 C184.688183,190.571453 175.782808,205.748399 127.301394,205.748399 C78.8199791,205.748399 69.9146039,190.571453 63.7579905,202.9511 C57.0981187,216.344927 95.7672709,230.221576 127.301394,230.221576 C158.835516,230.221576 197.507223,216.344927 190.844797,202.9511 L190.844797,202.9511 Z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M190.844797,202.9511 C184.688183,190.571453 175.782808,205.748399 127.301394,205.748399 L127.301394,230.221576 C158.835516,230.221576 197.507223,216.344927 190.844797,202.9511 L190.844797,202.9511 Z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M127.303948,0 C107.748398,0 93.6137335,7.54632198 95.4556083,16.7914605 C97.3000377,26.0340444 100.891821,45.2804865 127.303948,45.2804865 C153.716075,45.2804865 157.307859,26.0340444 159.152288,16.7914605 C160.994163,7.54632198 146.859498,0 127.303948,0 L127.303948,0 Z"
                      fill="#666666"
                    />
                    <path
                      d="M127.303948,0 C146.859498,0 160.994163,7.54632198 159.152288,16.7914605 C157.310413,26.036599 153.716075,45.2804865 127.303948,45.2804865 L127.303948,0 L127.303948,0 Z"
                      fill="#4D4D4D"
                    />
                  </g>
                </g>
              </svg>
              <p className='font-semibold bg-[#95eaa6] rounded-[5px] '>Chatbot</p>
            </button>
          }
        </div>
      </div>


    </div>
  )
}

export default ViewChatbot