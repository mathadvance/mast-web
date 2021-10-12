import { FC } from "react";
import { staff } from "utils/staff.json";
import Image from 'next/image'

const StaffBio: FC <{
  staffName: string,
  title?: string,
  biography: string,
  imageUrl?: string,
}> = ({staffName, title, biography, imageUrl}) => {
  return (
    <div className={`m-6 p-5 flex grid grid-cols-4 gap-3 flex-col rounded-xl`}>
      <div className={`col-span-3`}>
      <h3 className={`text-3xl text-center font-bold mb-1`}>{staffName}</h3>
      <p className={`text-lg text-center font-light`}>{title}</p>
              <span className={"flex-grow py-2"}>Biography</span>
                {biography}
      </div>
      <div>
        <Image
          src={imageUrl}
        />
      </div>
    </div>
  );
};

export default function Staff() {
  staff.sort((a,b)=>{
  const [aFirst, aLast] = a.staffName.split(" ");
  const [bFirst, bLast] = b.staffName.split(" ");
  if (aLast != bLast){
    return aLast < bLast ? -1 : 1;
  }
  if (aFirst == bFirst){
    return 0;
  }
 return aFirst < bFirst ? -1 : 1;
});

  return (
      <div
        className={
          "max-w-full py-14 flex flex-col items-center text-center justify-center"
        }
      >
        <div>
          <h2 className={"text-3xl text-primary-900 font-light"}>
            Math Advancement Tournament Staff
          </h2>
        </div>
        <div className={"flex flex-col"}>
          {staff.map((p)=>(
            <StaffBio
              staffName = {p.staffName}
              title = {p.title}
              biography = {p.biography}
              imageUrl = {typeof(p.imageURL) == null ? null : p.imageURL}
              />
          ))}
        </div>
    </div>
  );
}
