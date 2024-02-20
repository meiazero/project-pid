"""update task model

Revision ID: 991e4fafedaf
Revises: 21ce4b43c82a
Create Date: 2024-02-20 19:19:11.599039

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '991e4fafedaf'
down_revision = '21ce4b43c82a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.alter_column('title',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.alter_column('title',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)

    # ### end Alembic commands ###
