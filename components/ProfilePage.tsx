import { ProjectInterface, UserProfile } from "@/common.types";
import Image from "next/image";

import Link from "next/link";
import Button from "./Button";
import ProjectCard from "./ProjectCard";

type Props = {
  user: UserProfile;
};

const ProfilePage = ({ user }: Props) => (
  <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
    <section className="flexBetween max-lg:flex-col gap-10 w-full">
      <div className="flex items-start flex-col w-full">
        <div className="flexCenter w-[100px] h-[100px] rounded-full overflow-hidden relative">
          <Image
            src={user?.avatarUrl}
            className="object-cover"
            alt="user image"
            fill
          />
        </div>
        <p className="text-4xl font-bold mt-10">{user?.name}</p>
        {user?.description && (
          <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
            {user?.description}
          </p>
        )}

        <div className="flex mt-8 gap-5 w-full flex-wrap">
          <Link href={user?.githubUrl} target="_blank">
            <Button
              title="Follow"
              leftIcon="/plus-round.svg"
              bgColor="bg-light-white-400 !w-max"
              textColor="text-black-100"
            />
          </Link>
          <Link href={`mailto:${user?.email}`}>
            <Button title="Hire Me" leftIcon="/email.svg" />
          </Link>
        </div>
      </div>

      {user?.projects?.edges?.length > 0 ? (
        <Image
          src={user?.projects?.edges[0]?.node?.image}
          alt="project image"
          width={739}
          height={554}
          className="rounded-xl object-contain"
        />
      ) : (
        <Image
          src="/profile-post.png"
          width={739}
          height={554}
          alt="project image"
          className="rounded-xl"
        />
      )}
    </section>

    <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
      <p className="w-full text-left text-lg font-semibold">Recent Work</p>

      <div className="profile_projects">
        {user?.projects?.edges?.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={user.name}
            avatarUrl={user.avatarUrl}
            userId={user.id}
          />
        ))}
      </div>
    </section>
  </section>
);

export default ProfilePage;
