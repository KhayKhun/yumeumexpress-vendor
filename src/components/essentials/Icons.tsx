import React from "react";
import { useNavigate } from "react-router-dom";
import {
  RiUser3Line,
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiHeart3Line,
  RiLogoutBoxLine,
  RiNotification3Line,
  RiArrowRightDoubleLine,
  RiRefreshLine,
  RiNotificationOffLine,
} from "react-icons/ri";
import {MdOutlineFastfood} from 'react-icons/md';
import { FaCircleXmark } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BsBag, BsCart2, BsStarFill,BsShopWindow, BsPlus,BsDash, BsX } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

import { BiChevronRight } from "react-icons/bi";

interface IconProps {
  className ?: string;
}

export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <RiUser3Line className={className} />
);
export const ShoppingBagIcon: React.FC<IconProps> = ({ className }) => (
  <BsBag className={className} />
);
export const EditIcon: React.FC<IconProps> = ({ className }) => (
  <FiEdit className={className} />
);
export const HeartLineIcon: React.FC<IconProps> = ({ className }) => (
  <RiHeart3Line className={className} />
);
export const StarFillIcon: React.FC<IconProps> = ({ className }) => (
  <BsStarFill className={className} />
);
export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <BsPlus className={className} />
);
export const DashIcon: React.FC<IconProps> = ({ className }) => (
  <BsDash className={className} />
);
export const CartIcon: React.FC<IconProps> = ({ className }) => (
  <BsCart2 className={className} />
);
export const XMarkIcon: React.FC<IconProps> = ({ className }) => (
  <BsX className={className} />
);
export const XMarkFillIcon: React.FC<IconProps> = ({ className }) => (
  <FaCircleXmark className={className} />
);
export const ResturantIcon: React.FC<IconProps> = ({ className }) => (
  <BsShopWindow className={className} />
);
export const LogoutIcon: React.FC<IconProps> = ({ className }) => (
  <RiLogoutBoxLine className={className} />
);
export const RightArrowOpenIcon: React.FC<IconProps> = ({ className }) => (
  <RiArrowRightSLine className={className} />
);
export const NotiIcon: React.FC<IconProps> = ({ className }) => (
  <RiNotification3Line className={className} />
);
export const NotiOffIcon: React.FC<IconProps> = ({ className }) => (
  <RiNotificationOffLine className={className} />
);
export const FoodIcon: React.FC<IconProps> = ({ className }) => (
  <MdOutlineFastfood className={className} />
);
export const DoubleArrowIcon: React.FC<IconProps> = ({ className }) => (
  <RiArrowRightDoubleLine className={className} />
);
export const CheckmarkFillIcon: React.FC<IconProps> = ({ className }) => (
  <IoIosCheckmarkCircle className={className} />
);
export const RefreshIcon: React.FC<IconProps> = ({ className }) => (
  <RiRefreshLine className={className} />
);
export const SmallRightArrowIcon: React.FC<IconProps> = ({ className }) => (
  <BiChevronRight className={className} />
);

export const BackButton = ({text} : {text:string}) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(-1);
      }}
      className="text-lg text-primary-green flex items-center"
    >
      <RiArrowLeftLine /> <span className="text-sm">{text}</span>
    </button>
  );
};
