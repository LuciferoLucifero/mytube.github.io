SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE TABLE IF NOT EXISTS `live_restreams_logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `restreamer` VARCHAR(255) NOT NULL,
  `m3u8` VARCHAR(400) NULL,
  `destinations` TEXT NULL,
  `logFile` VARCHAR(255) NULL,
  `users_id` INT(11) NULL,
  `json` TEXT NULL,
  `created` DATETIME NULL,
  `modified` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
