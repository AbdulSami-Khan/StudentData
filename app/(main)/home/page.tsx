"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUsers } from "@/actions/getUsers";
import { deleteUser } from "@/actions/deleteUser";
import { updateUser } from "@/actions/updateUser";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [usersInfo, setUserInfo] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    getUsers()
      .then((data) => {
        setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = useCallback(
    (userId: string) => {
      deleteUser(userId).then(() => {
        router.refresh();
      });
    },
    [usersInfo]
  );

  const handleLike = useCallback((userId: string)=>{
    updateUser(userId,true).then(()=>{
      router.refresh();
    })
  },[])
  const handleUnlike = useCallback((userId: string)=>{
    updateUser(userId,false).then(()=>{
      router.refresh();
    })
  },[])

  return (
    <main>
      <div className="flex justify-between   p-8">
        <h1 className="text-3xl font-bold  text-slate-700">All Students</h1>
        <Button size={"lg"}>
          <Link
            href={"/userform"}
            className="flex items-center gap-x-2 justify-center"
          >
            <span>
              <FaPlus size={15} />
            </span>{" "}
            Add New
          </Link>
        </Button>
      </div>

      <div className="flex flex-col items-center gap-y-6 mt-10">
        {usersInfo?.map((userinfo: any) => {
          return (
            <Card
              key={userinfo.id}
              className="w-[500px]  shadow-red-300 shadow-lg"
            >
              <CardHeader>
                <CardTitle>{userinfo.name}</CardTitle>
                <CardDescription>
                  Age: {userinfo.age} <br />
                  Semester: {userinfo.semester}
                </CardDescription>
              </CardHeader>
              <CardContent>{userinfo.information}</CardContent>
              <CardFooter className="flex items-center justify-between">
                <MdDeleteForever
                  size={25}
                  onClick={() => handleDelete(userinfo.id)}
                />
                {userinfo.liked ? (
                  <AiFillLike size={25} onClick={()=>handleUnlike(userinfo.id)} />
                ) : (
                  <AiOutlineLike size={25}  onClick={()=>handleLike(userinfo.id)}/>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
