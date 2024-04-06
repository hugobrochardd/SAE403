<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240404094935 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE watchlist (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, INDEX IDX_340388D3A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE watchlist_movie (watchlist_id INT NOT NULL, movie_id INT NOT NULL, INDEX IDX_B38D698383DD0D94 (watchlist_id), INDEX IDX_B38D69838F93B6FC (movie_id), PRIMARY KEY(watchlist_id, movie_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE watchlist_movie ADD CONSTRAINT FK_B38D698383DD0D94 FOREIGN KEY (watchlist_id) REFERENCES watchlist (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE watchlist_movie ADD CONSTRAINT FK_B38D69838F93B6FC FOREIGN KEY (movie_id) REFERENCES movie (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D3A76ED395');
        $this->addSql('ALTER TABLE watchlist_movie DROP FOREIGN KEY FK_B38D698383DD0D94');
        $this->addSql('ALTER TABLE watchlist_movie DROP FOREIGN KEY FK_B38D69838F93B6FC');
        $this->addSql('DROP TABLE watchlist');
        $this->addSql('DROP TABLE watchlist_movie');
    }
}
