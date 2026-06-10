import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TarjetaRifa = ({ rifa, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);